mod db;
use axum::{
    extract::State,
    http::StatusCode,
    response::{Html, IntoResponse},
    routing::get,
    Form, Router,
};
use db::{connection, ConnectionType::Local};
use lazy_static::lazy_static;
use libsql::{de, Connection};
use serde::{Deserialize, Serialize};
use tera::Tera;
use tower_http::services::ServeDir;

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        match Tera::new("templates/**/*") {
            Ok(t) => t,
            Err(e) => {
                println!("Parsing error(s): {}", e);
                ::std::process::exit(1);
            }
        }
    };
}

#[derive(Clone)]
struct AppState {
    db: Connection,
}

#[shuttle_runtime::main]
async fn axum() -> shuttle_axum::ShuttleAxum {
    let db = connection(Local).await;
    let state = AppState { db };

    let routers = Router::new()
        // Serve "static" instead of "/static" because axum is not project aware
        .nest_service("/static", ServeDir::new("static"))
        .nest_service("/components", ServeDir::new("templates/components"))
        .route("/", get(root))
        .route("/new", get(write_blog).post(post_blog))
        .with_state(state);

    Ok(routers.into())
}

async fn root(State(state): State<AppState>) -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    let db = &state.db;
    let mut blogs: Vec<Blog> = vec![];
    if let Ok(mut rows) = db.query("select * from blogs", [0]).await {
        while let Ok(Some(row)) = rows.next() {
            blogs.push(de::from_row::<Blog>(&row).unwrap());
        }
    }
    dbg!(&blogs);
    ctx.insert("data_blogs", &blogs);
    ctx.insert(
        "image_profile_pic",
        "/static/images/profile-pic-placeholder.jpg",
    );
    ctx.insert("icon_github", "/static/icons/github-32.webp");
    ctx.insert("icon_instagram", "/static/icons/instagram-32.webp");
    ctx.insert("icon_twitter", "/static/icons/twitter-32.webp");
    ctx.insert("icon_linkedin", "/static/icons/linkedin-32.webp");
    ctx.insert("icon_reddit", "/static/icons/reddit-32.webp");
    ctx.insert("icon_rss", "/static/icons/rss-32.webp");

    let file = "index.html";
    Html(
        TEMPLATES
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

async fn write_blog() -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    ctx.insert("css_easymde", "/static/css/easymde.min.css");
    ctx.insert("js_easymde", "/static/js/easymde.min.js");

    let file = "new/index.html";
    Html(
        TEMPLATES
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

#[derive(Debug, Deserialize)]
struct BlogForm {
    title: String,
    description: String,
    content: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Blog {
    id: usize,
    title: String,
    description: String,
    content: String,
    hidden: bool,
    created_at: String,
}

async fn post_blog(State(state): State<AppState>, Form(blog): Form<BlogForm>) -> impl IntoResponse {
    let db = &state.db;
    db.execute(
        "CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        hidden BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );",
        [0],
    )
    .await
    .unwrap();
    dbg!(&blog);
    let mut stmt = db
        .prepare("INSERT INTO blogs (title, description, content) VALUES (?1, ?2, ?3)")
        .await
        .unwrap();
    stmt.execute((blog.title, blog.description, blog.content))
        .await
        .unwrap();
    StatusCode::from_u16(201).unwrap()
    // TODO: Redirect to the newly created blog
}

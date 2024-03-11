mod db;
use axum::{
    extract::{Path, State},
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
        .nest("/posts", routes_posts())
        .with_state(state);

    Ok(routers.into())
}

fn routes_posts() -> Router<AppState> {
    Router::new()
        .route("/new", get(write_post).post(publish_post))
        .route("/:title", get(show_post))
}

async fn show_post(State(state): State<AppState>, Path(slug): Path<String>) -> impl IntoResponse {
    let db = &state.db;
    let mut ctx = tera::Context::new();
    let mut posts: Vec<Post> = vec![];
    if let Ok(mut rows) = db
        .query(&format!("SELECT * FROM posts WHERE slug = '{slug}';"), [0])
        .await
    {
        while let Ok(Some(row)) = rows.next() {
            posts.push(de::from_row::<Post>(&row).unwrap());
        }
    }
    dbg!(&posts[0]);
    ctx.insert("data_post", &posts[0]);

    let file = "posts/index.html";
    Html(
        TEMPLATES
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

async fn root(State(state): State<AppState>) -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    let db = &state.db;
    let mut posts: Vec<Post> = vec![];
    if let Ok(mut rows) = db.query("SELECT id, title, description, content, hidden, substr ('--JanFebMarAprMayJunJulAugSepOctNovDec', strftime ('%m', created_at) * 3, 3) || strftime(' %d, %Y', created_at) AS created_at, last_edit, slug FROM posts;", [0]).await {
        while let Ok(Some(row)) = rows.next() {
            posts.push(de::from_row::<Post>(&row).unwrap());
        }
    }
    dbg!(&posts[0].created_at);
    dbg!(&posts);
    ctx.insert("data_posts", &posts);
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

async fn write_post() -> impl IntoResponse {
    dbg!("write new post!");
    let mut ctx = tera::Context::new();
    ctx.insert("css_easymde", "/static/css/easymde.min.css");
    ctx.insert("js_easymde", "/static/js/easymde.min.js");

    let file = "posts/new/index.html";
    Html(
        TEMPLATES
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

#[derive(Debug, Deserialize)]
struct PostForm {
    title: String,
    description: String,
    content: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Post {
    id: usize,
    title: String,
    description: String,
    content: String,
    hidden: bool,
    created_at: String,
    last_edit: String,
    slug: String,
}

async fn publish_post(
    State(state): State<AppState>,
    Form(post): Form<PostForm>,
) -> impl IntoResponse {
    dbg!("publishing!");
    let db = &state.db;
    db.execute(
        "CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        hidden BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_edit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        slug VARCHAR(255) UNIQUE NOT NULL
    );",
        [0],
    )
    .await
    .unwrap();
    dbg!(&post);
    let slug = slug::slugify(&post.title);
    let mut stmt = db
        .prepare("INSERT INTO posts (title, description, content, slug) VALUES (?1, ?2, ?3, ?4)")
        .await
        .unwrap();
    stmt.execute((post.title, post.description, post.content, slug))
        .await
        .unwrap();
    StatusCode::from_u16(201).unwrap()
    // TODO: Redirect to the newly created post
}

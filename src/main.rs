mod db;
use axum::{
    extract::State,
    response::{Html, IntoResponse},
    routing::get,
    Form, Router,
};
use db::{connection, ConnectionType::Local};
use lazy_static::lazy_static;
use libsql::Connection;
use serde::Deserialize;
use std::sync::Arc;
use tera::Tera;
use tower_http::services::ServeDir;

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let tera = match Tera::new("templates/**/*") {
            Ok(t) => t,
            Err(e) => {
                println!("Parsing error(s): {}", e);
                ::std::process::exit(1);
            }
        };
        tera
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
        .nest_service("/static", ServeDir::new("static"))
        .nest_service("/components", ServeDir::new("templates/components"))
        .route("/", get(root))
        .nest("/blogs", routes_blogs())
        .with_state(state);

    Ok(routers.into())
}

fn routes_blogs() -> Router<AppState> {
    Router::new().route("/new", get(blog_new).post(blog_post_new))
}

async fn root(State(_state): State<AppState>) -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    ctx.insert("css_tailwind", "/static/css/output.css");
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

async fn blog_new() -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    ctx.insert("css_tailwind", "/static/css/output.css");
    ctx.insert("css_easymde", "/static/css/easymde.min.css");
    ctx.insert("js_easymde", "/static/js/easymde.min.js");

    let file = "blogs/new/index.html";
    Html(
        TEMPLATES
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

#[derive(Debug, Deserialize)]
struct Blog {
    content: String,
}

mod db;
use axum::{
    debug_handler,
    extract::State,
    response::{Html, IntoResponse, Response},
    routing::get,
    Router,
};
use db::{
    connection,
    ConnectionType::{Local, Remote},
};
use libsql::{Connection, Database};
use std::sync::{Arc, Mutex};
use tera::{Context, Tera};
use tower_http::services::{ServeDir, ServeFile};

#[derive(Clone)]
struct AppState {
    templates: tera::Tera,
    db: Connection,
}

#[shuttle_runtime::main]
async fn axum() -> shuttle_axum::ShuttleAxum {
    let mut templates = Tera::new("templates/**/*").expect("Failed to initialize Tera.");
    // templates
    //     .full_reload()
    //     .expect("Failed to re-render templates.");
    let db = connection(Local).await;
    let state = Arc::new(AppState { templates, db });

    let routers = Router::new()
        .nest_service("/css", ServeDir::new("static/css"))
        .nest_service("/images", ServeDir::new("static/images"))
        .nest_service("/icons", ServeDir::new("static/icons"))
        .route("/", get(root))
        .route("/clicked", get(clicked))
        .with_state(state);

    Ok(routers.into())
}

async fn root(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    ctx.insert("css_tailwind", "css/output.css");
    ctx.insert("image_profile_pic", "images/profile-pic-192.webp");
    ctx.insert("icon_github", "icons/github-32.webp");
    ctx.insert("icon_instagram", "icons/instagram-32.webp");
    ctx.insert("icon_twitter", "icons/twitter-32.webp");
    ctx.insert("icon_linkedin", "icons/linkedin-32.webp");
    ctx.insert("icon_reddit", "icons/reddit-32.webp");
    ctx.insert("icon_rss", "icons/rss-32.webp");
    let template = &state.templates;
    let db = &state.db;

    let file = "index.html";
    Html(
        template
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}
async fn clicked(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    let template = &state.templates;
    let db = &state.db;

    let file = "clicked/index.html";
    Html(
        template
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

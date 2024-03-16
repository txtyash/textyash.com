mod db;
use anyhow::Result;
use axum::{
    extract::State,
    response::{IntoResponse, Response},
    routing::get,
    Json, Router,
};
use db::{connection, ConnectionType::Local};
use libsql::{de, Connection};

mod posts;
use posts::{routes_posts, Post};

#[derive(Clone)]
pub struct AppState {
    db: Connection,
}

#[tokio::main]
async fn main() -> Result<()> {
    let db = connection(Local).await;
    let state = AppState { db };

    let routers = Router::new()
        .route("/", get(root))
        .nest("/posts", routes_posts())
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, routers).await?;
    Ok(())
}

async fn root(State(state): State<AppState>) -> Response {
    let db = &state.db;
    let mut posts: Vec<Post> = vec![];
    if let Ok(mut rows) = db.query("SELECT id, title, description, content, hidden, substr ('--JanFebMarAprMayJunJulAugSepOctNovDec', strftime ('%m', created_at) * 3, 3) || strftime(' %d, %Y', created_at) AS created_at, last_edit, slug FROM posts;", [0]).await {
        while let Ok(Some(row)) = rows.next() {
            if let Ok(post) = de::from_row::<Post>(&row) {
                posts.push(post);
            }
        }
    }
    posts.reverse();
    Json(posts).into_response()
}

// TODO: Use sqlx
// TODO: Fix SQL Injection vulnerabilities
// TODO: Don't show hidden posts
// TODO: Implement Kinde Auth

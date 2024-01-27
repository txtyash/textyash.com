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

#[tokio::main]
async fn main() {
    let templates = Tera::new("templates/**/*").expect("Failed to initialize Tera.");
    let db = connection(Local).await;
    let state = Arc::new(AppState { templates, db });

    let routers = Router::new().route("/", get(root)).with_state(state);

    // run our app with hyper, listening globally on port 8080
    let listener = tokio::net::TcpListener::bind("localhost:8080")
        .await
        .unwrap();
    axum::serve(listener, routers).await.unwrap();
}

async fn root(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let mut ctx = tera::Context::new();
    let template = &state.templates;
    let db = &state.db;

    db.query("select 1; select 1;", ()).await.unwrap();

    db.execute("CREATE TABLE IF NOT EXISTS users (email TEXT)", ())
        .await
        .unwrap();

    let mut stmt = db
        .prepare("INSERT INTO users (email) VALUES (?1)")
        .await
        .unwrap();

    stmt.execute(["foo@example.com"]).await.unwrap();

    let mut stmt = db
        .prepare("SELECT * FROM users WHERE email = ?1")
        .await
        .unwrap();

    let mut rows = stmt.query(["foo@example.com"]).await.unwrap();

    let row = rows.next().unwrap().unwrap();

    let value = row.get_value(0).unwrap();

    println!("Row: {:?}", value);

    let file = "index.html";
    Html(
        template
            .render(file, &ctx)
            .expect("Failed to render {file}"),
    )
}

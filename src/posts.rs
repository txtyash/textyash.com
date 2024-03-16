use crate::{de, AppState};
use axum::{
    extract::{self, Path, State},
    http::StatusCode,
    response::{IntoResponse, Redirect, Response},
    routing::{delete, get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};

// TODO: Send correct JSON response with the StatusCode

#[derive(Debug, Deserialize, Serialize)]
struct PostForm {
    title: String,
    description: String,
    content: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Post {
    id: usize,
    title: String,
    description: String,
    content: String,
    hidden: bool,
    created_at: String,
    last_edit: String,
    slug: String,
}

pub fn routes_posts() -> Router<AppState> {
    Router::new()
        .route("/edit", post(create_post))
        .route("/:slug", get(read_post))
        .route("/edit/:slug", get(edit_post).put(update_post))
        .route("/delete/:slug", delete(delete_post))
}

async fn create_post(
    State(state): State<AppState>,
    extract::Json(post): extract::Json<PostForm>,
) -> Response {
    dbg!("[create_post] {}", &post);
    let db = &state.db;
    let slug = slug::slugify(&post.title);
    if db
        .execute(
            "INSERT INTO posts (title, description, content, slug) VALUES (?1, ?2, ?3, ?4)",
            (post.title, post.description, post.content, slug.clone()),
        )
        .await
        .is_ok()
    {
        return (StatusCode::CREATED, Redirect::to(&slug)).into_response();
    }
    // TODO: Send the correct response. ex: if the post with the title already exists.
    StatusCode::INTERNAL_SERVER_ERROR.into_response()
}

async fn read_post(State(state): State<AppState>, Path(slug): Path<String>) -> Response {
    let db = &state.db;
    if let Ok(mut rows) = db
        .query("SELECT id, title, description, content, hidden, created_at, strftime('%d/%m/%Y', last_edit) AS last_edit, slug FROM posts WHERE slug = ?1;", [slug])
        .await
    {
        if let Ok(Some(row)) = rows.next() {
            if let Ok(post) = de::from_row::<Post>(&row){
                return Json(post).into_response();
            }
        }
    }
    StatusCode::NOT_FOUND.into_response()
}

async fn edit_post(State(state): State<AppState>, Path(slug): Path<String>) -> Response {
    let db = &state.db;
    if let Ok(mut rows) = db
        .query(
            "SELECT title, description, content FROM posts WHERE slug = ?1;",
            [slug],
        )
        .await
    {
        if let Ok(Some(row)) = rows.next() {
            if let Ok(post) = de::from_row::<PostForm>(&row) {
                return Json(post).into_response();
            }
        }
    }
    StatusCode::NOT_FOUND.into_response()
}

async fn update_post(
    State(state): State<AppState>,
    Path(slug): Path<String>,
    extract::Json(post): extract::Json<PostForm>,
) -> Response {
    dbg!("[update_post] {}", &post);
    let db = &state.db;
    if db
        .execute(
            "UPDATE posts SET description=?1, content=?2 WHERE slug=?3;",
            (post.description, post.content, slug.clone()),
        )
        .await
        .is_ok()
    {
        return (StatusCode::OK, Redirect::to(&slug)).into_response();
    }
    // TODO: Send the correct response
    StatusCode::INTERNAL_SERVER_ERROR.into_response()
}

async fn delete_post(State(state): State<AppState>, Path(slug): Path<String>) -> Response {
    let db = &state.db;
    // TODO: Check if the post exists
    // if doesn't then send StatusCode::NOT_FOUND.into_response()
    if db
        .execute("DELETE FROM posts WHERE slug=?1;", [slug])
        .await
        .is_ok()
    // is OK even if the post doesn't exist
    {
        return (StatusCode::OK, Redirect::to("/")).into_response();
    }
    // TODO: Send the correct response
    StatusCode::NOT_FOUND.into_response()
}

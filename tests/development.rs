use anyhow::Result;
use axum::http::StatusCode;

const ADDRESS: &str = "http://localhost:8090";

#[tokio::test]
async fn root() -> Result<()> {
    let hc = httpc_test::new_client(ADDRESS)?;
    let get_req = hc.do_get("/").await?;
    get_req.print().await?;
    let status = get_req.status();
    assert_eq!(200, status);
    Ok(())
}

#[tokio::test]
async fn write_blog() -> Result<()> {
    let hc = httpc_test::new_client(ADDRESS)?;
    let get_req = hc.do_get("/blogs/new").await?;
    get_req.print().await?;
    let status = get_req.status();
    assert_eq!(200, status);
    Ok(())
}

#[tokio::test]
async fn post_blog() -> Result<()> {
    let hc = httpc_test::new_client(ADDRESS)?;
    let post_req = hc
        .do_post(
            "/blogs/new",
            (
                "title=rustblog&description=blogdescription&content=rustisnice",
                "application/x-www-form-urlencoded",
            ),
        )
        .await?;
    post_req.print().await?;
    let status = post_req.status();
    assert_eq!(201, status);
    Ok(())
}

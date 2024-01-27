use anyhow::Result;

#[tokio::test]
async fn root_health() -> Result<()> {
    let hc = httpc_test::new_client("http://localhost:8000")?;
    let get_req = hc.do_get("/").await?;
    get_req.print().await?;
    let status = get_req.status();
    assert_eq!(200, status);
    Ok(())
}

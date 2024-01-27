use libsql::{Connection, Database};
use std::env;

#[derive(PartialEq, Debug)]
pub enum ConnectionType {
    Local,
    Remote,
}

pub async fn connection(ct: ConnectionType) -> Connection {
    use ConnectionType::*;
    if ct == Local {
        println!("Using Local DB.");
        let db = Database::open_in_memory().expect("Failed to initialize local DB.");
        return db.connect().expect("Failed to connect to local DB.");
    } else {
        println!("Using Remote DB.");
        let url = env::var("LIBSQL_CLIENT_URL")
            .expect("Environment Variable 'LIBSQL_CLIENT_URL' not found!");
        let auth_token = env::var("LIBSQL_CLIENT_TOKEN")
            .expect("Environment Variable 'LIBSQL_CLIENT_TOKEN' not found!");
        let db = Database::open_remote(url, auth_token).expect("Failed to initialize remote DB.");
        return db.connect().expect("Failed to connect to remote DB.");
    }
}

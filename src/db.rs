use core::panic;
use libsql::{Connection, Database};
use std::env;

#[allow(unused)]
#[derive(PartialEq, Debug)]
pub enum ConnectionType {
    Local,
    Remote,
}

pub async fn connection(ct: ConnectionType) -> Connection {
    use ConnectionType::*;
    let db = {
        if ct == Local {
            println!("Using Local DB.");
            let db = Database::open("test.db").expect("Failed to initialize local DB.");
            db.connect().expect("Failed to connect to local DB.")
        } else {
            println!("Using Remote DB.");
            let url = env::var("LIBSQL_CLIENT_URL")
                .expect("Environment Variable 'LIBSQL_CLIENT_URL' not found!");
            let auth_token = env::var("LIBSQL_CLIENT_TOKEN")
                .expect("Environment Variable 'LIBSQL_CLIENT_TOKEN' not found!");
            let db =
                Database::open_remote(url, auth_token).expect("Failed to initialize remote DB.");
            db.connect().expect("Failed to connect to remote DB.")
        }
    };
    if (db
        .execute(
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
            (),
        )
        .await)
        .is_ok()
    {
        return db;
    }
    panic!("Failed to initialize DB")
}

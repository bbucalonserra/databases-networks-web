CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name,
    last_name,
    age,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    creation_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
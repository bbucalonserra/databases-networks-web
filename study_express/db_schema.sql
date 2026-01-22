CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    last_name TEXT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_forms_completed INT NOT NULL,
    creation_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forms (
    username TEXT PRIMARY KEY,
    age INT,
    sex TEXT,
    education TEXT,
    has_children TEXT,
    has_property TEXT,
    has_car TEXT,
    ever_loan TEXT,
    loan_paid TEXT,
    annual_salary TEXT,
    invested_amount TEXT
);
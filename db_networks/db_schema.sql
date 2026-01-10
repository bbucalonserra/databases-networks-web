PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_title TEXT DEFAULT 'My Event Manager',
    author_name TEXT DEFAULT 'Event Organiser'
);

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT DEFAULT 'New Event',
    description TEXT,
    event_date TEXT, -- Store as YYYY-MM-DD
    status TEXT DEFAULT 'draft', -- 'draft' or 'published'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Requisito específico: Tipos de bilhetes separados
    full_price_tickets INTEGER DEFAULT 0,
    full_price_cost REAL DEFAULT 0.0,
    concession_tickets INTEGER DEFAULT 0,
    concession_cost REAL DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    attendee_name TEXT NOT NULL,
    num_full_tickets INTEGER DEFAULT 0,
    num_concession_tickets INTEGER DEFAULT 0,
    FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO settings (id, site_title, author_name) VALUES (1, 'University Events', 'Student Admin');
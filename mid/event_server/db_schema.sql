------------------------------- START NEW CODE --------------------------
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

--Insert initial events.
INSERT INTO events (title, description, event_date, status, full_price_tickets, full_price_cost, concession_tickets, concession_cost) 
VALUES (
    'Global Tech Summit 2026', 
    'Join the biggest tech conference. Topics include AI, Web Development and Ethics.', 
    '2026-05-20', 
    'published', 
    100, 50.0, 50, 25.0
);

INSERT INTO events (title, description, event_date, status, full_price_tickets, full_price_cost, concession_tickets, concession_cost) 
VALUES (
    'Sunset Yoga by the River', 
    'Relaxing yoga session for all levels. Bring your own mat.', 
    '2026-02-14', 
    'published', 
    5, 15.0, 2, 10.0
);

INSERT INTO events (title, description, event_date, status, full_price_tickets, full_price_cost, concession_tickets, concession_cost) 
VALUES (
    'Italian Cooking Masterclass', 
    'Learn to make authentic pasta from scratch with Chef Mario.', 
    '2026-08-10', 
    'published', 
    15, 45.0, 10, 30.0
);

INSERT INTO events (title, description, event_date, status, full_price_tickets, full_price_cost, concession_tickets, concession_cost) 
VALUES (
    'Birthday Party', 
    'Come to my birthday party!', 
    '2026-10-10', 
    'draft', 
    20, 30.0, 5, 30.0
);

------------------------------- END NEW CODE --------------------------
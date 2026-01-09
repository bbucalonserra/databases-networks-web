PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
    ticket_price_type TEXT NOT NULL CHECK (ticket_price_type IN ('full', 'concession')),
    quantity_tickets INT NOT NULL,
    price_tickets NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    attendee_name TEXT NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    site_title TEXT,
    author_name TEXT
);

CREATE TABLE IF NOT EXISTS attendees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    attendee_name TEXT NOT NULL,
    attendee_email TEXT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events (id)
);

-- Insert default data
INSERT INTO settings (id, site_title, author_name) 
VALUES (1, 'My Event Manager', 'Admin');

INSERT INTO events (title, description, content, status, published_at, ticket_price_type, quantity_tickets, price_tickets) 
VALUES ('Inaugural Yoga Class', 'Come join our practice', 'Detailed content about the yoga session...', 'published', CURRENT_TIMESTAMP, 'full', 20, 10.00);

INSERT INTO events (title, description, content, status, ticket_price_type, quantity_tickets, price_tickets) 
VALUES ('Painting Workshop', 'Planning phase', 'This event is not published yet', 'draft', 'concession', 15, 5.00);

COMMIT;
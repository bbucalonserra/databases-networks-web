const express = require("express");
const router = express.Router();

/**
 * @desc Display the organiser dashboard
 */
router.get("/", function (req, res) {
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        global.db.all("SELECT * FROM events", (err, events) => {
            res.render('organiser', { 
                settings: settings, 
                events: events || [] 
            });
        });
    });
});

/**
 * @desc Show settings page
 */
router.get("/settings", function (req, res) {
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        res.render('settings', { settings: settings });
    });
});

/**
 * @desc Update site settings
 */
router.post("/settings", function (req, res) {
    const { site_title, author_name } = req.body;
    global.db.run("UPDATE settings SET site_title = ?, author_name = ? WHERE id = 1", 
        [site_title, author_name], 
        (err) => {
            res.redirect("/organiser");
        }
    );
});

/**
 * @desc Show form to add a new event
 */
router.get("/add-event", (req, res) => {
    res.render('add-event');
});

/**
 * @desc Create a new event
 */
router.post("/add-event", (req, res) => {
    const { title, description, content, price_tickets } = req.body;
    const query = `INSERT INTO events (title, description, content, price_tickets, status) 
                   VALUES (?, ?, ?, ?, 'draft')`;
    global.db.run(query, [title, description, content, price_tickets], function(err) {
        if (err) console.error(err.message);
        res.redirect("/organiser");
    });
});

/**
 * @desc DELETE an event from the database
 */
router.post("/delete-event/:id", (req, res) => {
    const eventId = req.params.id;
    global.db.run("DELETE FROM events WHERE id = ?", [eventId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error deleting event");
        } else {
            res.redirect("/organiser");
        }
    });
});

/**
 * @desc GET event details and attendees for the edit form
 */
router.get("/edit-event/:id", (req, res) => {
    const eventId = req.params.id;
    
    // Check if ID exists to avoid 404
    global.db.get("SELECT * FROM events WHERE id = ?", [eventId], (err, event) => {
        if (err || !event) {
            res.status(404).send("Event not found");
        } else {
            // Fetch attendees for this specific event
            global.db.all("SELECT * FROM attendees WHERE event_id = ?", [eventId], (err, attendees) => {
                res.render('edit-event', { 
                    event: event, 
                    attendees: attendees || [] 
                });
            });
        }
    });
});

/**
 * @desc POST updated data to the database
 */
router.post("/edit-event/:id", (req, res) => {
    const eventId = req.params.id;
    const { title, description, content, price_tickets, status } = req.body;
    const query = `UPDATE events SET title = ?, description = ?, content = ?, price_tickets = ?, status = ? WHERE id = ?`;

    global.db.run(query, [title, description, content, price_tickets, status, eventId], function(err) {
        if (err) {
            res.status(500).send("Update error");
        } else {
            res.redirect("/organiser");
        }
    });
});

module.exports = router;
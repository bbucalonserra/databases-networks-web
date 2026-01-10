const express = require("express");
const router = express.Router();

/**
 * @route GET /organiser
 * @purpose Display dashboard with separate lists for Drafts and Published events.
 * @inputs None
 * @outputs Renders 'organiser.ejs' with settings, publishedEvents, draftEvents.
 */
router.get("/", (req, res) => {
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        global.db.all("SELECT * FROM events ORDER BY created_at DESC", (err, events) => {
            const publishedEvents = events.filter(e => e.status === 'published');
            const draftEvents = events.filter(e => e.status === 'draft');
            
            // Note: We pass separate lists to the view
            res.render("organiser", { settings, publishedEvents, draftEvents });
        });
    });
});

/**
 * @route GET /organiser/settings
 * @purpose Show site settings form.
 * @inputs None
 * @outputs Renders 'settings.ejs'
 */
router.get("/settings", (req, res) => {
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        res.render("settings", { settings });
    });
});

/**
 * @route POST /organiser/settings
 * @purpose Update site configuration.
 * @inputs Form data: site_title, author_name
 * @outputs Redirects to /organiser
 */
router.post("/settings", (req, res) => {
    const { site_title, author_name } = req.body;
    global.db.run("UPDATE settings SET site_title = ?, author_name = ? WHERE id = 1", 
        [site_title, author_name], (err) => res.redirect("/organiser"));
});

/**
 * @route POST /organiser/add-event
 * @purpose Create a blank draft event and redirect to edit page.
 * @inputs None
 * @outputs Redirects to /organiser/edit-event/:id
 */
router.post("/add-event", (req, res) => {
    global.db.run("INSERT INTO events (title, status) VALUES ('New Event', 'draft')", function(err) {
        res.redirect(`/organiser/edit-event/${this.lastID}`);
    });
});

/**
 * @route GET /organiser/edit-event/:id
 * @purpose Show form to edit event details.
 * @inputs URL param: id
 * @outputs Renders 'edit-event.ejs'
 */
router.get("/edit-event/:id", (req, res) => {
    global.db.get("SELECT * FROM events WHERE id = ?", [req.params.id], (err, event) => {
        res.render("edit-event", { event });
    });
});

/**
 * @route POST /organiser/edit-event/:id
 * @purpose Update all event fields.
 * @inputs Form data (title, description, dates, ticket info)
 * @outputs Redirects to /organiser
 */
router.post("/edit-event/:id", (req, res) => {
    const { title, description, event_date, full_price_tickets, full_price_cost, concession_tickets, concession_cost } = req.body;
    const sql = `UPDATE events SET title=?, description=?, event_date=?, 
                 full_price_tickets=?, full_price_cost=?, concession_tickets=?, concession_cost=?, 
                 last_modified=CURRENT_TIMESTAMP WHERE id=?`;
    global.db.run(sql, [title, description, event_date, full_price_tickets, full_price_cost, concession_tickets, concession_cost, req.params.id], 
        (err) => res.redirect("/organiser"));
});

/**
 * @route POST /organiser/publish/:id
 * @purpose Change status to 'published' and set timestamp.
 * @inputs URL param: id
 * @outputs Redirects to /organiser
 */
router.post("/publish/:id", (req, res) => {
    global.db.run("UPDATE events SET status='published', published_at=CURRENT_TIMESTAMP WHERE id=?", 
        [req.params.id], (err) => res.redirect("/organiser"));
});

/**
 * @route POST /organiser/delete/:id
 * @purpose Delete an event.
 * @inputs URL param: id
 * @outputs Redirects to /organiser
 */
router.post("/delete/:id", (req, res) => {
    global.db.run("DELETE FROM events WHERE id=?", [req.params.id], (err) => res.redirect("/organiser"));
});

module.exports = router;
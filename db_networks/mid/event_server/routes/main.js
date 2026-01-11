/* -----------------START NEW CODE ----------------------------- */
const express = require("express");

// Create a router.
// App is the entire application, therefore we need to create a small piece of it.
// Create a router, which unite the routes.
// It must be connected with the app to work properly.
const router = express.Router();

/**
 * @route GET /
 * @purpose Main landing page. Just links to other areas.
 * @inputs None
 * @outputs Renders 'index.ejs' with settings.
 */

// Get data.
// Request and response.
// Response is what to send.
// Request is what is received.
router.get("/", (req, res) => {
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        if (err) console.error(err);
        res.render("index", { settings: settings || { site_title: 'Event Manager', author_name: 'Admin' } });
    });
});

module.exports = router;
/* ----------------- END NEW CODE ----------------------------- */
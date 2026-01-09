/**
 * index.js - Final Version
 */

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

// Middleware and Settings
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Database Setup
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', function(err){
    if(err){
        console.error(err);
        process.exit(1);
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON");
    }
});

//////////////////////////////////////// PUBLIC ROUTES (ATTENDEE) ////////////////////////////////////////

// Home Page: Shows settings and published events
app.get('/', (req, res) => {
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        global.db.all("SELECT * FROM events WHERE status = 'published'", (err, events) => {
            res.render('index', { settings: settings, events: events });
        });
    });
});

// Event Details: Shows specific event content
app.get('/event/:id', (req, res) => {
    const eventId = req.params.id;
    global.db.get("SELECT * FROM settings WHERE id = 1", (err, settings) => {
        const query = "SELECT * FROM events WHERE id = ? AND status = 'published'";
        global.db.get(query, [eventId], (err, event) => {
            if (err || !event) {
                res.status(404).send("Event not found.");
            } else {
                res.render('event-details', { settings: settings, event: event });
            }
        });
    });
});

// Register Attendee: Saves registration in the DB
app.post('/register-attendee', (req, res) => {
    const { event_id, attendee_name, attendee_email } = req.body;
    const query = "INSERT INTO attendees (event_id, attendee_name, attendee_email) VALUES (?, ?, ?)";
    global.db.run(query, [event_id, attendee_name, attendee_email], function(err) {
        if (err) {
            res.status(500).send("Registration error.");
        } else {
            res.send("<h1>Registration Successful!</h1><a href='/'>Return Home</a>");
        }
    });
});

//////////////////////////////////////// ORGANISER ROUTES ////////////////////////////////////////

const organiserRoutes = require('./routes/organiser');
app.use('/organiser', organiserRoutes);

// Start Server
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
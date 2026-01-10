/**
 * index.js - Main Server Entry Point
 */

// Import express library.
// Creating object for express. 
// The server is created here, it's in the computers memory.
// However, it's "sleeping" yet until is called. 
// SOURCE: https://expressjs.com/en/4x/api.html
const express = require('express');
const app = express();

// Selecting port 3000.
const port = 3000;

// Import sqlite3 library.
const sqlite3 = require('sqlite3').verbose();

// Middlewares.
// Middleware functions are functions that have access to the request object (req),
// the response object (res), and the next middleware function in the application’s
// request-response cycle.
// Summarizing: middlewere are functions that are executed before the route (between requisition and route).
/* 
Exemple:
1. The person types the URL and presses Enter
2. The browser sends the request
3. The server receives the request
4. The middleware is executed
5. The route is executed
6. The server sends the response
7. The browser receives the respons
*/

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Database Connection
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); 
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON");
    }
});

// --------------------------- Import Routes --------------------------- 
const mainRoutes = require('./routes/main');
const organiserRoutes = require('./routes/organiser');
const attendeeRoutes = require('./routes/attendee');

// Use Routes. It's here that is defined the name from the URL.
// The URL is always: index + inside route.
// E.g. route organiser, inside organiser there's add-event -> http://localhost:3000/organiser/add-event.
app.use('/', mainRoutes);
app.use('/organiser', organiserRoutes);
app.use('/attendee', attendeeRoutes);


// Turn on server. "Opens" door 3000.
// Literally listen a port.
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
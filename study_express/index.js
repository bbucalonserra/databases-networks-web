const express = require("express");
const ejs = require('ejs');
require('dotenv').config();
const port = process.env.PORT;

// "Hey express, vou te chamar de app."
const app = express();

const mainRoutes = require("./routes/main");

app.use('/', mainRoutes);

app.listen(port, function() {
    console.log(`Listening to the port ${port}...`)
})
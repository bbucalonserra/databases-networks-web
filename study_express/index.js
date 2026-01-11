const express = require('express');

const server = express();

server.get('/curso', function (req, res) {
    console.log("ACESSOU A ROTA");
    return res.send("Hi!!!!")
});

server.listen(3000);
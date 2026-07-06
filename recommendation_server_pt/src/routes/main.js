// Importa o express.
const express = require("express");

// Cria um router para separar em rotas em arquivos diferentes.
const router = express.Router()

// "Hey app (apelido de express), fica ouvindo a porta, quando alguem bater nela,"
// "ou seja, fizer um get, com final "/", voce vai enviar a resposta renderizar o EJS.
router.get("/", function(req, res) {
    return res.render("homepage.ejs")
});

// Exporta router.
module.exports = router;
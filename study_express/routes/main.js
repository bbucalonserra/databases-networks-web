// Importa o express.
const express = require("express");

// Importa o EJS.
const ejs = require("ejs")

// Atribui o express para variável app.
const app = express();

// Cria um router para separar em rotas em arquivos diferentes.
const router = express.Router()

// Importando o sqlite3.
const sqlite3 = require('sqlite3')

// Basicamente, dizendo para o express a aprender a ler formulários.
router.use(express.urlencoded({ extended: true }));


// Importar o banco de dados. Vamos instancia-lo chamando de "db".
const db = new sqlite3.Database('./database.db')

// "Hey app (apelido de express), fica ouvindo a porta, quando alguem bater nela,"
// "ou seja, fizer um get, com final "/", voce vai enviar a resposta renderizar o EJS.
router.get("/", function(req, res) {
    return res.render("homepage.ejs")
});


//
router.get("/login", function(req, res) {
    return res.render("login.ejs")
});

//
router.get("/create-user", function(req, res) {
    return res.render("create-user.ejs")
});

// Vamos coletar o que foi pego pelo input do usuario via HTML e armazena-lo (POST) em variáveis.
// Em seguida, posta-las no banco.
router.post("/save-to-database", function(req, res) {

    // Aqui, ele vai armazenar o que foi recebido na memória RAM do servidor.
    // Na query, o "?" representam espaços reservados, visto que nao é colocado os nomes diretos na query para ser dinâmico.
    const username = req.body.username;
    const password = req.body.password; 
    const name = req.body.name;
    const lastName = req.body.last_name;
    const age = req.body.age;
    const insertIntoQuery = "INSERT INTO users (username, password, name, last_name, age) VALUES (?, ?, ?, ?, ?)";

    console.log("Usuario: ", username);
    console.log("Senha: ", password);
    console.log("Nome: ", name);
    console.log("Sobrenome: ", lastName);
    console.log("Idade: ", age);
    
    // Banco de dados (insert into).
    // O run vai rodar a query. Parametros: query, array (lista) com as consts que vao ser inseridas, 
    db.run(insertIntoQuery, [username, password, name, lastName, age], function(){
        res.redirect("/")
    })
})

// Exporta router.
module.exports = router;
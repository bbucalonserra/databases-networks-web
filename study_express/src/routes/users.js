// Importa o express.
const express = require("express");

// Cria um router para separar em rotas em arquivos diferentes.
const router = express.Router()

// Importando do database.js
const db = require("../config/database.js");

// Rota de login.
router.get("/login", function(req, res) {
    // SE ERRO:
    // Pegamos a mensagem que foi salva no POST (se existir)
    const erroMsg = req.session.errorMessage;

    // Deletamos da sessão logo após ler. 
    // Assim, se ele der F5, a mensagem some da tela.
    delete req.session.errorMessage;

    // Passamos a mensagem para o EJS (se estiver vazio, passará undefined)
    return res.render("login.ejs", { erro: erroMsg });
});

// Método para verificar se o usuário existe, caso sim, loga, caso não, não loga.
// Utilizamos POST porque ele vai no body da requisição.
// POST envia dados para serem processados, por isso usamos.
// POST nao tem limite de caracteres.
router.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const checkUserQuery = "SELECT * FROM users WHERE username = ? AND password = ?"

    // O db.run possui três parâmetros: a consulta SQL, os parâmetros (entre []) que substituirão as "?"
    // UTILIZAMOS O DB.GET PORQUE QUEREMOS QUE O BANCO DE DADOS RETORNE UMA INFORMAÇÃO.
    // O primeiro parâmetro da função de callback é sempre um erro (err).
    // O segundo é o resultado (output) do callback.
    db.get(checkUserQuery, params = [username, password], function(err, user) {
        
        // Se houver algum erro, mostrar o erro.
        if (err) {
            return res.send(err.message);
        }

        // Se tiver usuário, loga corretamente. Caso nao, envia usuario ou senha inválido.
        if (user) {
            // Salva o username na session. Apenas salvar se o login for executado!
            req.session.username = req.body.username;

            // User é um objeto do javascript com o output da query!
            // Logo, quando fazemos user.is_forms_completed, estamos pegando a coluna.
            // Se o forms estiver completo.
            if (user.is_forms_completed === 1) {
                return res.redirect("/recommendations"); 
            } else {

                // Se o forms nao estiver completo. vai pra tela de forms.
                return res.redirect("/forms");  
            }

        } else {
            // Senha invalida ou usuario.
            req.session.errorMessage = "Invalid user or password.";

            return res.redirect("/login");
        }
    })
})

// Rota de criar usuário.
router.get("/create-user", function(req, res) {
    return res.render("create-user.ejs")
});

// Vamos coletar o que foi pego pelo input do usuario via HTML e armazena-lo (POST) em variáveis.
// Em seguida, posta-las no banco.
router.post("/create-user", function(req, res) {

    // Aqui, ele vai armazenar o que foi recebido na memória RAM do servidor.
    // Na query, o "?" representam espaços reservados, visto que nao é colocado os nomes diretos na query para ser dinâmico.
    const username = req.body.username;
    const password = req.body.password; 
    const name = req.body.name;
    const lastName = req.body.last_name;
    const createUserQuery = "INSERT INTO users (username, password, name, last_name, is_forms_completed) VALUES (?, ?, ?, ?, 0)";
    const createUsernameQuery = "INSERT INTO forms (username) VALUES (?)";

    // Salva o username na session!
    req.session.username = req.body.username;


    // USAMOS O RUN PORQUE É APENAS EXECUTAR UMA AÇÃO.
    // Banco de dados (insert into).
    // O run vai rodar a query. Parametros: query, array (lista) com as consts que vao ser inseridas, 
    db.run(createUserQuery, params = [username, password, name, lastName], function(err){

        // Se algum erro. Caso nao, cria.
        if (err) {
            //
            return res.send("Error while creating user: " + err.message);
        } 

        db.run(createUsernameQuery, params = [username], function(err){
            // Erro no formulário.
            if (err) {
                return res.send("Erro ao registrar no formulário: " + err.message);
            }

            // Redireciona para tela de login.
            return res.redirect("/login");
        });
    });
});

// Exporta router.
module.exports = router;
require('dotenv').config();

const express = require("express");
const ejs = require('ejs');
const port = process.env.PORT;

// "Hey express, vou te chamar de app."
const app = express();

// Importando session pra guardar o nome do usuario.
const session = require('express-session');

// Importo o modulo path.
const path = require('path');

// Chame tudo que está no routes/main.js.
const main = require("./routes/main");
const users = require("./routes/users");
const forms = require("./routes/forms");

// Configuração para EJS.
// __dirname é a pasta 'src'. path.join garante que ele ache 'src/views'
// Express, pegue aquele seu ajuste de Localização de Telas (o 1º views) e defina que 
// o endereço dele é: A minha localização atual (__dirname) combinada com a minha pasta 
// chamada views (o 2º views).
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Basicamente, dizendo para o express a aprender a ler formulários.
app.use(express.urlencoded({ extended: true }));

// Mantém na memória. Cria um cookie no navegador que guarda um código de identificação
// criptografado (connect.sid). Já no servidor, na memoria RAM, ele reserva espaço 
// para guardar informações que sobrevivam enquanto usuario pula de pagina pra pagina,
// ou seja tudo que se inicia com req.session.
app.use(session({
    secret: 'chave-bruni', // Pode ser qualquer frase
    resave: false, // Não salva a sessão se não houver mudanças
    saveUninitialized: true, // Cria uma sessão mesmo que nada tenha sido guardado
    cookie: { 
        secure: false, // 'false' (sem HTTPS)
        maxAge: 3600000 // Tempo de vida da sessão: 1 hora
    }
}));

// Chamando as rotas principais. Aqui que vai na URL.
app.use('/', main);
app.use('/', users);
app.use('/', forms);

// Escutando a porta. Nao chama os arquivos guardados anteriores, ele apenas guarda na memória.
app.listen(port, function() {
    console.log(`Listening to the port ${port}...`)
})
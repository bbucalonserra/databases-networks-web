// Importando o sqlite3.
const sqlite3 = require('sqlite3')

// Path.
const path = require('path');

// Importar o banco de dados. Vamos instancia-lo chamando de "db".
const dbPath = path.resolve(__dirname, '../data/database.db');
const db = new sqlite3.Database(dbPath);

// Exporta apenas o objeto de conexão
// Isso permite que qualquer outro arquivo do projeto use o MESMO banco
module.exports = db;
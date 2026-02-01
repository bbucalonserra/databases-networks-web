// Importa o express.
const express = require("express");

// Cria um router para separar em rotas em arquivos diferentes.
const router = express.Router()

// Importando do database.js
const db = require("../config/database.js");

// Importando arquivo com produtos.
// Dois pontos é um diretório a cima.
const products = require('../data/products.json');

// EJS.
// Lembrando: aqui vai ser sempre o definido no app + isto. Ex: se no app esta "/", vai 
// ser / + forms, se estiver + /teste, vai ser /teste + /forms = /teste/forms.
// Passamos como segundo argumento o json.
router.get("/recommendations", function(req, res) {

    // Ordenando os produtos.
    // Aqui, precisamos usar uma função visto que o sort ordena via string.
    // O método sort ele percorre a array e compara dois a dois, usa Timsort (variação
    // do quicksort com mergesort), ele faz a - b pra cada par e vai ordenando,
    // logo, por exemplo, se b.probability - a.probability = 0,95 - 0,85 = 0,10
    // resultado positivo, logo fica assim, agora se for 0,85 - 0,95 negativo, ai
    // eles invertem.
    // Assim, fazendo b - a ordenamos de forma DECRESCENTE.
    const orderedProducts = products.sort(function (probaA, probaB) {
        return probaB.probability - probaA.probability;
    });

    // Colocamos o json dentro de um objeto chamado de list.
    return res.render("user-homepage.ejs", {products: products});
});

// Exporta router.
module.exports = router;
// Importa o express.
const express = require("express");

// Cria um router para separar em rotas em arquivos diferentes.
const router = express.Router()

// Importando do database.js
const db = require("../config/database.js");

// Importando arquivo com produtos.
// Dois pontos é um diretório a cima.
const productsTemplate = require('../data/products.json');

// EJS.
// Lembrando: aqui vai ser sempre o definido no app + isto. Ex: se no app esta "/", vai 
// ser / + forms, se estiver + /teste, vai ser /teste + /forms = /teste/forms.
// Passamos como segundo argumento o json.
router.get("/recommendations", function(req, res) {
    /*

    RESUMO DO MÉTODO GET PARA RENDERIZAÇÃO COM SERVIDOR DE ML:

    --------------------------------------------------
    Primeiramente eu seleciono os dados do form do usuario. 
    Em sequencia, crio um objeto chamado userData com todos os outputs que tem no banco.

    Tenho as informações armazenadas no userData... Ai, eu faço uma requisição HTTP com POST usando 
    await fetch (await pq preciso aguardar o usuario chegar 'nessa etapa').

    Defino método, o header (com base no /docs da FastAPI) e o body vai ser sermpre no meu caso um JSON, 
    entao eu uso JSON.stringify(userData) pra transformar o objeto que eu tenho em um JSON.

    Crio uma variavel chamada dictProbas que vai receber o JSON de resposta, ou seja response.json().

    Finalmente, eu vou criar um objeto vazio chamado finalRecommendations para cada ID de produto no meu dictProbas... 
    ai, assim que ele encontrar um ID no meu dicionario que é o output do servidor de ML, eu vou adicionar (push) dentro 
    do objeto finalRecommendations name, category, description e probability, 
    sendo os 3 primeiros do JSON details que vem do productsTemplate e a probability do dictProbas.
   --------------------------------------------------
    */


    
    // Recupera o usuário da sessão.
    const loggedUser = req.session.username;

    // Se não tiver usuário logado, manda pro login.
    if (!loggedUser) {
        return res.redirect("/login");
    }

    // BUSCAR DADOS NO BANCO (Ao invés do JSON)
    // Selecionamos os dados que o usuário preencheu no formulário.
    const query = "SELECT * FROM forms WHERE username = ?";

    db.get(query, [loggedUser], async (err, row) => {
        // Se der erro ou não achar o formulário preenchido.
        if (err || !row) {
            return res.send("Please, fill the forms before");
        }

        try {
            // PREPARAR DADOS PARA O PYTHON
            // O modelo espera um JSON com números inteiros.
            // Como alteramos o banco para INTEGER, o 'row' já virá corretamente.
            const userData = {
                age: row.age,
                sex: row.sex,
                education: row.education,
                has_children: row.has_children,
                has_property: row.has_property,
                has_car: row.has_car,
                ever_loan: row.ever_loan,
                loan_paid: row.loan_paid,
                annual_salary: row.annual_salary,
                invested_amount: row.invested_amount
            };

            /*
            Chamando a API do Python.
            Vamos usar await, porque precisaremos de uma função assync aguardando o output do server de ml.
            Alem disso, vamos usar fetch com o endereço do servidor.
            Como segundo argumento de fetch, colocamos um objeto com as "regras" do protocolo.
            Utilizaremos: method (POST), headers (metadados, formato, etc.), e o body (conteudo).
            Em headers, colocamos sempre o Content-Type que iremos enviar.
            No caso, usamos application por ser json, que sao dados estruturados, mas poderia ser:
                - text/ (dados lidos por humanos, como html ou css)
                - image/ (dados que sao pixels)
                - video/ (arquivos de midia)
                - audio/ (arquivos de midia)
                - application/ (json etc.)
            */

            // É exatamente aqui que o JavaScript faz a requisição pro nosso servidor de ML.
            // Aqui, fica armazenado os dados da requisição, sendo que em body estao as probabilidades.
            const response = await fetch("http://127.0.0.1:8000/predict", {
                // Método da requisição.
                method: "POST",

                /*
                O que estamos buscando.
                PODEMOS VERIFICAR isto no /docs do servidor ML,
                Logo abaixo de "Responses", temos "Media type" para os códigos.
                200 e 422, sendo:
                    - 200 sucesso (requisição recebida, entendida e processada), node envviou dados,
                    python calculou com regressão logística e devolveu as probabilidades.
                    - 422 erro de conteúdo (requisição recebida, mas os dados dentro dele estão errados),
                 ou sejam node enviou o pacote JSON, mas o conteúdo nao bate com o que o Python espera.
                */
                headers: { "Content-Type": "application/json" },

                // O objeto userData existe na RAM como um objeto "{age: 29, ...}", um objeto exclusivo do
                // JavaScript, logo, preciamos tranforma-lo em JSON com JSON.stringify.
                body: JSON.stringify(userData)
            });

            // Se o Python devolver erro (ex: 422 ou 500), tratamos aqui.
            if (!response.ok) {
                throw new Error("Error in loading recommendations.");
            }

            // O Python devolve: { "personal_loan": 0.85, "mortgage": 0.20 ... }
            // Pode ser verificado em http://127.0.0.1:8000/docs
            // Quando faz-se response.json(), estamos desempacotando body e transformando em um json.
            const dictProbas = await response.json();

            // Criando copia do JSON com informações.
            const finalRecommendations = [];

            // 
            for(let productID in dictProbas) {
                // Buscamos no nosso "Dicionário" (JSON) os dados estáticos deste produto.
                // O método find vai procurar no productsTemplate quando productID for igual ao id,
                // PARA CADA productID do dictProbas.
                const details = productsTemplate.find(function(p) {
                        return p.id === productID;
                    });

                if (details) {
                    finalRecommendations.push({
                        name: details.name,
                        category: details.category,
                        description: details.description,
                        probability: dictProbas[productID] // Dado dinâmico que veio de ML
                    });
                }
            }

        // Ordenação.
        finalRecommendations.sort(function(a, b) {
            return b.probability - a.probability;
        });

        // Retorna resposta com renderização da página.
        return res.render("user-homepage.ejs", { products: finalRecommendations });
        } catch (error) {
            console.log(error);
            return res.status(500).send("AI Server is offline.");
        }
    });
});

// Exporta router.
module.exports = router;
const express = require('express');

const server = express();

/* Entender que estamos enviando uma estrutura json
Quando um cliente (como um aplicativo mobile, um site 
ou o software Insomnia/Postman) envia dados para o seu servidor, 
esses dados viajam pela internet como uma string de texto puro 
(uma sequência de caracteres), e não como um objeto JavaScript pronto para uso.

O express.json() é o que chamamos de Middleware. Ele atua como um "tradutor" 
ou um "filtro" que fica posicionado antes das suas rotas

Proceso:
A Requisição chega: O cliente envia uma string: '{"name": "NodeJS"}'.
O Middleware intercepta: O server.use(express.json()) captura essa string.
A Tradução (Parsing): Ele transforma essa string em um objeto JavaScript real: { name: "NodeJS" }
A Entrega: Ele "pendura" esse objeto dentro do req.body para que o senhor possa acessá-lo na sua rota.
*/
server.use(express.json())

let cursos = ['Node JS', 'JavaScript', 'React Native']


// Criando um middleware.
// O `` junto com $ é igual ao f string do python.
server.use(function(req, res, next) {
    console.log(`REQUISIÇÃO CHAMADA:  ${req.url}`)

    // "Continuar". Ele só passou pelo middlware global. Pode ser um debug.
    return next;
})


//------------------------------ REQUISIÇÕES ------------------------------
/*
As funções que passamos dentro de cada requisição são middlewares.
Um middleware no Express é qualquer função que tenha acesso aos objetos 
de requisição (req), resposta (res) e à próxima função de middleware no ciclo
de solicitação-resposta da aplicação (geralmente chamada de next).
*/
// REQUISIÇÃO GET.
server.get('/cursos/:index', function (req, res) {
    console.log("Rota acessada.");
    
    // Usando chaves, estamos passando apenas o valor da propriedade index.
    const { index } = req.params;

    return res.json(cursos[index]);
});

server.get('/cursos', function (req, res) {
    console.log("Rota acessada.");

    return res.json(cursos);
});


/*
A chave name vai receber um valor (O "{}" signigica pegar apenas o valor). 
Voce vai adicionar esse valor em cursos e retornar todos os cursos.
Precisamos fazer server.use(express.json()) para ele entender como json e nao string ao enviar.
*/
// REQUISIÇÃO POST. Criando novo curso.
server.post('/cursos', function(req, res) {

    console.log("POST completo.")

    // Usando chaves, estamos passando apenas o valor da propriedade name.
    const { name } = req.body;

    cursos.push(name);

    return res.json(cursos);
})

// REQUISIÇÃO PUT. Atualizando curso.
server.put('/cursos/:index', function(req, res) {

    console.log("PUT completo.")

    const { index } = req.params;

    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);

})


// REQUISIÇÃO DELETE. Deletar curso existente.
server.delete('/cursos/:index', function(req, res) {

    console.log("DELETE completo.")

    const { index } = req.params;

    cursos.splice(index, 1);

    return res.json(cursos);

})


server.listen(3000);



/*
Quando usar req.params (A Identificação):
Usá-lo quando a informação é obrigatória para identificar um recurso específico.
Sem esse dado, a rota nem faz sentido.
Uso principal: Buscar, deletar ou atualizar um item específico por ID ou Index.
COLOCAR NA PROPRIA URL O DADO.

Quando usar req.query (A filtragem):
usá-lo para informações opcionais, como filtros, buscas ou ordenação. 
A rota funciona mesmo se eles não forem enviados.
Uso principal: Filtros de pesquisa (ex: buscar cursos de uma categoria específica) ou paginação.
COLOCAR APÓS "?"

Quando usar req.body (O Conteúdo)
Usá-lo quando precisa enviar um grande volume de dados ou informações sensíveis que devem estar 
"escondidas" na estrutura da mensagem, e não visíveis na barra de endereços do navegador.
Uso principal: Criação (POST) ou Edição completa (PUT) de registros.
COLOCAR NO CORPO DA MENSAGEM, sem aparecer em URL.


Regra geral: Se está enviando dados para serem salvos, use body. Se está identificando
algo para agir sobre ele, use params. Se está refinando uma busca, use query.
*/


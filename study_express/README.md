# SERVIDORES

## Web Applications
Aplicações web em engenharia de software são programas rodados via servidor web. Ao contrário de aplicações que rodam em um sistema operacional, eles precisam ser acessados através do browser (TechTerms, 2014).

Uma de suas principais vantagens em relação as aplicações via sistemas operacionais, elas não precisam ser desenvolvidas para multipla plataformas, por exemplo uma aplicação desenvolvida para web browser irá funcionar tanto em IOS quanto em Wnidows.

Existem duas tipologias principais de aplicações web: static e dynamic. Aplicações estáticas armazenam todos os dados (HTML, CSS, etc.) diretamente no servidor, sendo carregados para todos usuários de forma igual, não há processamento de dados em tempo real visto que os dados são armazenados no servidor, é também conhecida como single tier. Já aplicações dinamicas os dados são gerados de forma dinâmica, coletados via query de um banco de dados e renderizados em tempo real.


## Three Tier Architecture
A arquitetura de três camadas é composta pela presentation tier (interface do usuário), application tier (onde os dados são processador) e a data tier (onde os dados da aplicação são armazenados e gerenciados).

A application tier é também chamada de middleware, em que o programa interage diretamente com banco de dados por queries, recebendo resultados e processando-os para apresentação ao usuario, o fron-end (Ceri et al., 2003).

![three-tier-architecutre](/assets/three-tier-architecture.png)

É importante salientar para a computação, se o dado (HTML) e a forma como ele deve ser exibido estão no mesmo arquivo e não mudam, eles pertencem à mesma camada lógica (Presentation). O fato de o arquivo estar em outra máquina é apenas um detalhe de rede, não de arquitetura de software. Logo sites estáticos são considerados one tier. 


## Métodos HTTP
* GET http://minhaapi.com/usuarios

* POST http://minhaapi.com/usuarios

* PUT http://minhaapi.com/usuarios/1

* DELETE http://minhaapi.com/usuarios/1

Em que:
* GET, POST, PUT e DELETE = Metodos HTTP
* Usuarios = Rota
* 1 = Parametro

NOTES:

* O GET envia o conteúdo pela URL, o POST não.
* POST submete dados ao servidor, faz-o procesar.
* Uma requisição HTTP é composta por linha de requisição, header e body.
* **GET anexa dados a URL (conhecidos como query parameters ou url parameters)**
* **POST enviamos dados pelo body da requisição HTTP**
* O GET é usado apenas para obter dados.
* O POST é usado para enviar ou processar dados que resultam em uma mudança no servidor, como um formulário.
* Diferentemente do GET, quando realizamos um post estamos enviando dados pelo body, para isso, 
colocamos no código a estrutura que a pessoa deve enviar (exemplo, id = numero, etc.) e o local (end-point). Em suma: o onde (end-point), como (metodo, post), e estrutura (logica, no req.body).

Exemplo da estutura HTTP:
```
POST /api/usuarios HTTP/1.1       -> Linha de requisição
Host: api.exemplo.com             -> Header
User-Agent: MeuClienteHTTP/1.0    -> Header
Content-Type: application/json    -> Header
Content-Length: 42                -> Header

{
  "nome": "Fulano de Tal",        -> Body
  "email": "fulano@exemplo.com"   -> Body
}

```

## Códigos HTTP
1. 1XX Informação

2. 2XX: sucesso
    * 200 – Success
    * 201 - Created

3. 3XX: redirecionamneto
    * 301 - Moved permanently
    * 302 - Moved

4. 4XX: Error
    * 400 – Bad request (front mandou info errada ou faltando)
    * 401 – Unauthorized (nao pode entrar)
    * 402 – Not found (nao encontrado)

5. 5XX: Server Error
    * 500: Server Error

# Responses e Requests
Uma resposta é o que o servidor envia caso receba uma request com o formato apropriado. 
Exemplo solicitação get:

```js
server.get('/curso', function (req, res) {
    console.log("ACESSOU A ROTA");
});
```

Parametros:
* req = Request, o que foi enviado pelo cliente.
* res = Response, retornar uma resposta para o front-end.

NOTE: 
* Client-side é onde a request é iniciada (cria e envia o request).
* Server-side é onde a request é recebida, processada e gerada (processa a request e retorna uma response).

O objeto response possui diversos métodos. Exemplos:

1. res.json() - Envia uma resposta em formato JSON. Padrão para REST APIs.
    ```js
    res.json({ mensagem: "Dados processados com sucesso", status: true });
    ```

1. res.send() - Envia um texto "Cru". Ele vai diretamente para o body do HTML.
    ```js
    res.send("Hello World!");
    ```

3. res.sendStatus() - Envia a representação textual do status.
    ```js
    res.sendStatus(404);
    ```

4. res.render() -  Trabalhar com server-side rendering (SSR), ou seja, quando o servidor monta o HTML completo antes de envia-lo ao cliente ao navegador. Diferente do res.send, que já envia o texto bruto, este renderiza.
    ```js
    res.render('index', { titulo: 'Minha Página' });
    ```

5. res.redirect() - Redireciona o cliente para uma nova rota.
    ```js
    res.redirect('/nova-rota');
    ```

6. res.sendFile() - Envia um arquivo estático, como um PDF ou imagem diretamente para o navegador. Necessário caminho absoluto.
    ```js
    res.sendFile(__dirname + '/relatorio.pdf');
    ```

6. res.download() - Semelhante ao sendFile, porém força o navegador a baixar o arquivo ao invés de visualiza-lo.
    ```js
    res.download('./documento.zip', 'projeto.zip');
    ```


## Utilizando FastAPI
Produtização de modelos utilizando FastAPI.


REST API mandatoriamente conversam via json. Tem padrões (manual) para isto.
PROCURAR DEPOIS OS PADRÕES.





## Ordem de execução
cd ml_api

python -m venv venv

source venv/Scripts/activate

pip install -r requirements.txt




## Referências Bibliográficas
CERI, S. et al. (2003) Designing Data-Intensive Web Applications. Elsevier Science & Technology.

TECHTERMS (2014) Web Application. Available at: https://techterms.com/definition/web_application (Accessed: 17 January 2026).
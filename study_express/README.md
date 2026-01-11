# SERVIDORES

```js
server.get('/curso', function (req, res) {
    console.log("ACESSOU A ROTA");
});
```

req = Request, o que foi enviado pelo cliente.,
res = Response, retornar uma resposta para o front-end.

NOTE: 
* Client-side é onde a request é iniciada (cria e envia o request).
* Server-side é onde a request é recebida, processada e gerada (processa a request e retorna uma response).

O objeto response possui diversos métodos. Ele possui:

1. res.json() - Envia uma resposta em formato JSON. Padrão para REST APIs.
    ```js
    res.json({ mensagem: "Dados processados com sucesso", status: true });
    ```

2. res.sendStatus() - Envia a representação textual do status.
    ```js
    res.sendStatus(404);
    ```

3. res.render() -  Trabalhar com server-side rendering (SSR), ou seja, quando o servidor monta o HTML completo antes de envia-lo ao cliente ao navegador. Diferente do res.send, que já envia o texto bruto, este renderiza.
    ```js
    res.render('index', { titulo: 'Minha Página' });
    ```

4. res.redirect() - Redireciona o cliente para uma nova rota.
    ```js
    res.redirect('/nova-rota');
    ```

5. res.sendFile() - Envia um arquivo estático, como um PDF ou imagem diretamente para o navegador. Necessário caminho absoluto.
    ```js
    res.sendFile(__dirname + '/relatorio.pdf');
    ```

6. res.download() - Semelhante ao sendFile, porém força o navegador a baixar o arquivo ao invés de visualiza-lo.
    ```js
    res.download('./documento.zip', 'projeto.zip');
    ```
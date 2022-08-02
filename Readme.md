## Em construção
Neste projeto vou desenvolver algumas funcionalidades para testar meus conhecimento com node e javascript etc...

Autenticação Node + JWT https://github.com/Underewarrr/sigamais-app/issues/12

### Configs
Entre na pasta back-end e front-end e rode `npm install`

Após a instalação incie o servidor do back-end com

`npm run devStart` dessa maneira ao salvar seu arquivo não tem necessidade de reiniciar o node

ou 

`node index.js`

Agora entre na pasta do front-end e inicie o app

`npm start`
### Importante
Configure sua database com o schema.sql que esta na pasta do backend

Não esqueça de preencher seus dados no index.js na pasta back-end

`const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'usuario database',
    password: 'senha database',
    database: 'nome database'
});`

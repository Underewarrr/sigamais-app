## Em construção
Neste projeto vou desenvolver algumas funcionalidades para testar meus conhecimento com node e javascript etc...

## Em construção

### Ferramentas Utilizadas no Front-End
    Axios
    Bootstrap
    Formik
    React-bootstrap 
    Yup 
### Ferramentas Utilizadas no Back-End
    Axios
    Cors
    Ejs (Not Utilized YET)
    Express
    Mysql
    Nodemon

> Em Construção

### Ordem de Pull Requests
 ***Front-End*** 
> - Cria sistema de login e registro (https://github.com/Underewarrr/sigamais-app/pull/1)
> - Melhoria no sistema de login e registro (https://github.com/Underewarrr/sigamais-app/pull/4)
> 
 ***Back-End***
> - Cria sistema de login e registro (https://github.com/Underewarrr/sigamais-app/pull/3)
> - Refatoração no sistema de login e registro (https://github.com/Underewarrr/sigamais-app/pull/5)
> - Painel de cadastro de redes (https://github.com/Underewarrr/sigamais-app/pull/7)

 ***Refac's Back-End***
> - Login e Registro via `API` com `bcrypt` Autenticação JWT (https://github.com/Underewarrr/sigamais-app/pull/13)

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

### Como eu sei que um usuario está logado

- > Se estiver logado, eu tenho que verificar se o usuario está logado.

***Para Logar***
- > Recebe o email e senha do usuario.
- > Validar os dados no banco de dados (back-end).
- > Validando corretamente os dados, eu tenho que criar um token de autenticação "Referencia de autenticação" salvando no banco de dados na tabela do usuario uma coluna de last_Login.
- > Tratamentos de erros (exceções) para o usuario.

***Para DesLogar***

- > Apagar a referencia que existe no browser do usuario.
- > A referencia de autenticação deve ser apagada do banco de dados.
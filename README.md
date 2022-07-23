# Boas vindas ao repositório do Trybe Futebol Clube!

- Este projeto contém minha API e banco de dados para fornecer informações sobre partidas e classificações de futebol. Através dos endpoints é possivel fazer um login que disponibilizará um token, e também ler e atualizar dados sobre partidas, times e classificações dos times.

- O projeto foi desenvolvida para utilzar a ORM Sequelize e tokens para autentificação com JWT, uma arquitetura de software MSC (model-service-controller), Express para as rotas, utiliza um banco MySQL para a gestão de dados e Joi para validação dos dados recebidos. Além disso, a API desenvolvida utilizando TypeScript e JavaScript, com POO (Programação Orientada a Objetos), seguindo o princípio SOLID!

- A Aplicação utiliza a biblioteca "bcrypt" para encriptar e verificar as senhas no banco de dados.

- Esta aplicação é coberta por testes de integração utilizando a metodologia TDD (fazendo os testes antes dos requisitos). Para os testes foi utilizado Jest, Mocha e Chai.

  - Este projeto foi individual e foram `7` dias de projeto.
  - `IMPORTANTE: ` Neste projeto o foco do desenvolvimento foi o Back-end, logo o Front-end, docker-compose e estruturação do projeto foram disponibilizados pela Trybe! Meu desenvolvimento foi a partir da pasta `/app/backend`!

---

# Como rodar localmente...

- Para rodar este projeto localmente você vai precisar ter instalado o Docker, Docker-compose versão >=1.29.2, GitHub, Node versão 16 e um gerenciador de banco de dados, e basta seguir o passo a passo abaixo.

1. Clone o repositório com o comando:
  - `git clone git@github.com:caioBatistaDosSantos/Project-Trybe-Futebol-Club---TFC.git`;
    - Entre na pasta do repositório:
      - `cd Project-Trybe-Futebol-Club---TFC`
2. Instale as dependencia com o comando:
  - `npm install`
3. Conecte-se a um gerenciador de banco de dados com os seguintes dados:
  - host='localhost',
  - user='root',
  - port='3306',
  - password='password',
  (Essa conexão será nescessária para criar o banco de dados)
4. Suba o container Docker com o comando:
  - `npm run compose:up`

- Apos o `passo 4` a aplicação já vai estar rodando dentro do container docker e você pode testá-la na seguinte URL: `http://localhost:3001`. Você também pode utilizar a versão gráfica acessando a pasta "/app/frontend"  e rodando o seguinte comando:
  - `npm start`

---

# Rotas do Projeto

## 1 - Endpoint POST /login

- O endpoint é capaz de realizar um login e retornar um token;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
  }
  ```
- O campo `email` é obrigatório e deve ser válido no banco de dados.
- O campo `password` é obrigatório e deve ser válido no banco de dados.

- Caso 'email' e 'password' estejam corretos, retorna o `status 200` e um token válido.

## 2 - Endpoint GET /login/validate

- O endpoint retorna o tipo de acesso do usuário cadastrado. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado no endpoints POST `/login`.

## 3 - Endpoint GET /teams

- O endpoint retorna um array com todos os temes cadastrados. Devendo retornar o `status 200`, com os dados no corpo.

## 4 - Endpoint GET /teams/:id

- O endpoint retorna um time com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição com um time existente (ex: `/teams/1`).

## 5 - Endpoint GET /matches

- O endpoint retorna um array com todos os jogos cadastrados. Devendo retornar o `status 200`, com os dados no corpo.

## 6 - Endpoint GET /matches?inProgress=true

- O endpoint retorna um array com todos os jogos cadastrados que a partida ainda esteja em andamento. Devendo retornar o `status 200`, com os dados no corpo.

## 7 - Endpoint GET /matches?inProgress=false

- O endpoint retorna um array com todos os jogos cadastrados que a partida já tenha acabado. Devendo retornar o `status 200`, com os dados no corpo.

## 8 - Endpoint POST /matches

- O endpoint adiciona uma nova partida ao banco de dados;

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado no endpoints POST `/login`.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "homeTeam": 16,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ```

- O campo `homeTeam` deve ser o id de um time válido. Ele é obrigatório.
- O campo `awayTeam` deve ser o id de um time válido. Ele é obrigatório.
- O campo `homeTeam` não pode ser igual ao campo `awayTeam`.
- O campo `homeTeamGoals` é obrigatório.
- O campo `awayTeamGoals` é obrigatório.

- Caso esteja tudo certo, retorna o `status 201` e a nova partida no corpo.

## 9 - Endpoint PATCH /matches/:id/finish

- O endpoint finaliza uma partido em andamento disponibilizada pelo id da rota.

- Retorna o `status 200` e o seguinte corpo:

  ```json
  { "message": "Finished" }
  ```

## 10 - Endpoint PATCH /matches/:id

- O endpoint atualiza uma partida no banco de dados disponibilizada pelo id da rota.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

- O campo `homeTeamGoals` é obrigatório.
- O campo `awayTeamGoals` é obrigatório.


- Caso esteja tudo certo, retorna o `status 200` e o seguinte corpo:

  ```json
  { "message": "Successfully updated" }
  ```

## 11 - Endpoint GET /leaderboard

- O endpoint retorna um array com o placar das partidas finalizadas de todos os times. Devendo retornar o `status 200`, com os dados no corpo.

-`Obs`: todas as informações do placar são fornecidas através de regras de negócio no backend, o frontend é respnsável apenas por reenderizar essas informações.

## 12 - Endpoint GET /leaderboard/home

- O endpoint retorna um array com o placar das partidas finalizadas de todos os times em casa. Devendo retornar o `status 200`, com os dados no corpo.

-`Obs`: todas as informações do placar são fornecidas através de regras de negócio no backend, o frontend é respnsável apenas por reenderizar essas informações.

## 13 - Endpoint GET /leaderboard/away

- O endpoint retorna um array com o placar das partidas finalizadas de todos os times visitantes. Devendo retornar o `status 200`, com os dados no corpo.

-`Obs`: todas as informações do placar são fornecidas através de regras de negócio no backend, o frontend é respnsável apenas por reenderizar essas informações.

---

# Feedback são bem-vindos!!

- Se Possivel, deixe seu feedback ou seu code-review! Muito Obrigado! :)🤝🛠

- Linkedin: https://www.linkedin.com/in/caio-batista-dos-santos/
- Gmail: drcaiosan@gmail.com

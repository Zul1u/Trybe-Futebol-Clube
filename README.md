# Trybe Futebol Clube

## Sumário

* [Contexto](#contexto)
* [Configurações Iniciais](#configurações-iniciais)
* [Pré-requisitos](#pré-requisitos)
* [Instalando](#instalando)
* [Executando com Docker](#executando-com-o-docker)
* [Executando os testes](#executando-os-testes)
* [Principais Tecnologias usadas](#principais-tecnologias-usadas)
* [Observações](#observações)

## Contexto

O projeto Trybe Futebol Clube é uma aplicação full stack onde eu desenvolvi somente o back end.
Eu desenvolvi uma API RESTful orientada a objetos que alimenta o front end com o placar de alguns jogos de futebol. Nesta API você pode ler, cadastrar e atualizar jogos. Todas essas operações contam com validações para evitar que ocorra algum erro inesperado.

## Configurações Iniciais

Essas instruções fornecerão a você uma cópia do projeto em sua máquina local para fins de desenvolvimento e teste. Fique atento aos pré-requisitos.

### Pré-requisitos

Para executar este projeto você precisará ter instalado em sua máquina:

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (opcional)

 MySQL Workbench é opcional, mas é recomendado para gerenciar o banco de dados através de uma interface visual.

### Instalando

Antes de tudo, após clonar o repositório, você precisará instalar as dependências:

```
cd Trybe-Futebol-Clube && npm run postinstall
```

Para executar o projeto sem o Docker, você precisará criar um arquivo `.env` na raiz do projeto e preenchê-lo com as seguintes informações:

```
JWT_SECRET=jwt_secret
APP_PORT=3001
DB_USER=seu_user
DB_PASS=sua_senha
DB_HOST=localhost 
DB_PORT=3002
```

Nos campos HOST, USER e PASSWORD, você deve inserir as informações do seu banco de dados MySQL. Se você estiver usando o MySQL Workbench, poderá encontrar essas informações na guia MySQL Connections.

## Executando com o Docker

Para executar o projeto com o Docker, você precisará ter o Docker instalado em sua máquina. Depois disso, você precisará executar os seguintes comandos na pasta raiz do projeto:

```
npm run compose:up:dev
```
Este comando está configurado para compartilhar volumes com o docker e também utiliza o script que realiza o live-reload ao fazer modificações no back-end.

para parar o container do docker use:
```
npm run compose:down:dev
```

## Executando os testes

Para executar os testes, você deve ir ao diretório backend e executar o seguinte comando:

```
npm run test
```

Para verificar o nível de cobertura de testes você deve executar:

```
npm run test:coverage
```

E para executar os testes de estilo do código, execute:


```
npm run lint
```

## Principais Tecnologias usadas

* [Node.js](https://nodejs.org/en/) - Runtime de Javascript
* [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript
* [Express](https://expressjs.com/) - Framework Web para Node.js
* [Sequelize](https://sequelize.org/) - ORM para manipulação do DB
* [MySQL](https://www.mysql.com/) - Banco de dados
* [Mocha](https://mochajs.org/) - Framework de testes
* [Chai](https://www.chaijs.com/) - Biblioteca de asserssões
* [Sinon](https://sinonjs.org/) - Spys, stubs e mocks

## Observações

Neste projeto as configurações dos scripts (dos arquivos package.json), do docker e do Eslint foram desenvolvidas pela equipe da [Trybe](https://www.betrybe.com/).

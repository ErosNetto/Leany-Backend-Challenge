<div align="center">
  <h1>API de Times Pokémon</h1>
  <p>
    Uma API RESTful robusta, construída com Nest.JS, para gerenciar treinadores e seus times de Pokémon, com autenticação JWT e integração com a PokéAPI.
  </p>
</div>

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração e Instalação](#️-configuração-e-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Executando a Aplicação](#️-executando-a-aplicação)
- [Documentação da API](#-documentação-da-api)
- [Fluxo de Autenticação](#-fluxo-de-autenticação)

---

### ✨ Funcionalidades

- 🔐 **Autenticação JWT**: Sistema completo de registro e login com tokens JWT para proteger os endpoints.
- 👤 **Gerenciamento de Treinadores**: CRUD completo para criar, listar, buscar, atualizar e deletar treinadores.
- 🏆 **Gerenciamento de Times**: CRUD completo para gerenciar os times, sempre associados a um treinador.
- 🐲 **Integração com PokéAPI**: Adicione e remova Pokémon em um time. A API valida a existência do Pokémon e enriquece as respostas com dados (nome, tipo, imagem) da PokéAPI.
- 🛡️ **Validação de Dados**: Uso de `class-validator` e DTOs para garantir que os dados de entrada sejam seguros e corretos.
- 📚 **Documentação Interativa**: Geração automática de documentação com Swagger (OpenAPI).

---

### 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas e robustas do ecossistema Node.js:

- **Framework**: [Nest.JS](https://nestjs.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (gerenciado via Docker)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Autenticação**: [Passport.js](http://www.passportjs.org/) (com estratégias `passport-jwt`)
- **Validação**: `class-validator` e `class-transformer`
- **Documentação**: `Swagger (OpenAPI)`
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)

---

### ✅ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v18.x ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

---

### ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e copie o conteúdo do arquivo `.env.example` (ou use o modelo da seção abaixo).

4.  **Inicie o banco de dados com Docker:**
    Este comando irá criar e iniciar o container do PostgreSQL em segundo plano.
    ```bash
    docker-compose up -d
    ```

---

### 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis. Substitua os valores conforme necessário.

```env
# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=leany_user
DB_PASSWORD=leany_password
DB_DATABASE=poke_teams_db

# Configuração da Aplicação
API_PORT=3000

# Configuração do JWT (JSON Web Token)
JWT_SECRET=leany_backend_challenge_JWT_SECRET
JWT_EXPIRES_IN=60m

# URL da Pokeapi
POKEAPI_URL=https://pokeapi.co/api/v2/pokemon/
```

---

### ▶️ Executando a Aplicação

Para iniciar a API em modo de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

### 📚 Documentação da API

A documentação completa e interativa dos endpoints está disponível via Swagger. Após iniciar a aplicação, acesse:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs/)

Lá você poderá visualizar todos os endpoints, seus parâmetros, DTOs e testar a API diretamente pelo navegador.

---

### 🛡️ Fluxo de Autenticação

Para acessar os endpoints protegidos, siga este fluxo:

1. **Registro (**`POST /trainers`**)**: Crie um novo treinador. Esta rota é pública.

```JSON
{
  "nome": "Seu Nome de Treinador",
  "password": "SuaSenhaForte123",
  "cidadeOrigem": "Sua Cidade"
}
```

2. **Login (**`POST /auth/login`**)**: Envie o nome e a senha do treinador para obter um token de acesso.

```JSON
{
  "nome": "Seu Nome de Treinador",
  "password": "SuaSenhaForte123"
}
```

A resposta será um `access_token`.

3. **Acessando Rotas Protegidas**: Para todas as outras requisições (ex: `POST /teams`), inclua o token no cabeçalho Authorization como um Bearer Token.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

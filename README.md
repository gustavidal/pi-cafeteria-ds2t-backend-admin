# 🍽️ Cafeteria DS2T - Backend Administrativo

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0.3-85EA2D?style=flat-square)](https://swagger.io/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green?style=flat-square)](LICENSE)

> API RESTful para gerenciamento de produtos, categorias e imagens da cafeteria temática "Frequency 80 Cafe"

## 📋 Sobre o Projeto

Esta é uma API robusta e segura para controle de produtos destinada à cafeteria temática **Frequency 80 Cafe**. A API fornece endpoints para gerenciamento administrativo completo e acesso público aos dados de produtos, categorias e imagens através da landing page.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **JavaScript** - Linguagem de programação
- **OpenAPI 3.0.3** - Especificação e documentação da API
- **JWT (JSON Web Tokens)** - Autenticação segura
- **RESTful** - Arquitetura de API
- **bcrypt** - Criptografia de senhas
- **Express**
- **CORS**
- **Knex**
- **mysql2**
- **body-parser**
- **dotenv**

## 📁 Estrutura do Projeto

```
├── controller/       # Controladores da API
├── doc/              # Documentação Swagger
├── middleware/       # Filtros da API
├── model/            # Modelos de dados
├── node_modules/     # Modelos do Node
├── routes/           # Rotas da aplicação
├── .gitignore        # Arquivo gitignore
├── app.js            # Arquivo App
├── LICENSE           # MIT License
├── package-lock.json # Dependências do projeto
├── package.json      # Dependências do projeto
└── README.md         # Este arquivo
```

## 🔐 Autenticação

A API utiliza **Bearer Token JWT** para autenticação de endpoints administrativos.

## 🎯 Endpoints por Categoria

### 🛡️ Administração - Admin
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/v1/frequency80cafe/administracao/admin` | Criar novo admin | ❌ |
| GET | `/v1/frequency80cafe/administracao/admin` | Listar todos os admins | ✅ |
| GET | `/v1/frequency80cafe/administracao/admin/{id}` | Buscar admin por ID | ✅ |
| PUT | `/v1/frequency80cafe/administracao/admin/{id}` | Atualizar admin | ✅ |
| DELETE | `/v1/frequency80cafe/administracao/admin/{id}` | Deletar admin | ✅ |
| POST | `/v1/frequency80cafe/administracao/admin/login` | Fazer login | ❌ |

### 📂 Administração - Categoria
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/v1/frequency80cafe/administracao/categoria` | Criar categoria | ✅ |
| GET | `/v1/frequency80cafe/administracao/categoria` | Listar categorias | ❌ |
| GET | `/v1/frequency80cafe/administracao/categoria/{id}` | Buscar categoria por ID | ❌ |
| PUT | `/v1/frequency80cafe/administracao/categoria/{id}` | Atualizar categoria | ✅ |
| DELETE | `/v1/frequency80cafe/administracao/categoria/{id}` | Deletar categoria | ✅ |

### 🖼️ Administração - Imagem

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/v1/frequency80cafe/administracao/imagem` | Criar imagem | ✅ |
| GET | `/v1/frequency80cafe/administracao/imagem` | Listar imagens | ❌ |
| GET | `/v1/frequency80cafe/administracao/imagem/{id}` | Buscar imagem por ID | ❌ |
| PUT | `/v1/frequency80cafe/administracao/imagem/{id}` | Atualizar imagem | ✅ |
| DELETE | `/v1/frequency80cafe/administracao/imagem/{id}` | Deletar imagem | ✅ |

### 🛒 Administração - Produto

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/v1/frequency80cafe/administracao/produto` | Criar produto | ✅ |
| GET | `/v1/frequency80cafe/administracao/produto` | Listar produtos | ❌ |
| GET | `/v1/frequency80cafe/administracao/produto/{id}` | Buscar produto por ID | ❌ |
| PUT | `/v1/frequency80cafe/administracao/produto/{id}` | Atualizar produto | ✅ |
| DELETE | `/v1/frequency80cafe/administracao/produto/{id}` | Deletar produto | ✅ |

### 🌐 Landing Page - Categoria

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/frequency80cafe/categoria` | Listar todas as categorias |
| GET | `/v1/frequency80cafe/categoria/{id}` | Buscar categoria por ID |

### 🌐 Landing Page - Imagem

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/frequency80cafe/imagem` | Listar todas as imagens |
| GET | `/v1/frequency80cafe/imagem/{id}` | Buscar imagem por ID |

### 🌐 Landing Page - Produto

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/frequency80cafe/produto` | Listar todos os produtos |
| GET | `/v1/frequency80cafe/produto/{id}` | Buscar produto por ID |

## 📝 Exemplos de Requisições

### 1. Criar um novo Admin

```bash
curl -X POST "https://frequency-80-cafe-administracao.onrender.com/v1/frequency80cafe/administracao/admin" \
  -H "Content-Type: application/json" \
  -d '{
    "nome_usuario": "admin_user",
    "email": "admin@example.com",
    "senha": "senhaSegura123"
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "nome_usuario": "admin_user",
  "email": "admin@example.com",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Fazer Login

```bash
curl -X POST "https://frequency-80-cafe-administracao.onrender.com/v1/frequency80cafe/administracao/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "login": "admin_user",
    "senha": "senhaSegura123"
  }'
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "nome_usuario": "admin_user",
  "email": "admin@example.com",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Criar uma Categoria (com autenticação)

```bash
curl -X POST "https://frequency-80-cafe-administracao.onrender.com/v1/frequency80cafe/administracao/categoria" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "categoria": "Bebidas Quentes"
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "categoria": "Bebidas Quentes"
}
```

### 4. Criar um Produto (com autenticação)

```bash
curl -X POST "https://frequency-80-cafe-administracao.onrender.com/v1/frequency80cafe/administracao/produto" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "nome": "Café Espresso",
    "descricao": "Café espresso tradicional com grãos premium",
    "preco": 8.50,
    "categoria": [{"id": 1}]
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "nome": "Café Espresso",
  "descricao": "Café espresso tradicional com grãos premium",
  "preco": 8.50,
  "categoria": [{"id": 1, "categoria": "Bebidas Quentes"}],
  "imagem": []
}
```

### 5. Adicionar Imagem a um Produto (com autenticação)

```bash
curl -X POST "https://frequency-80-cafe-administracao.onrender.com/v1/frequency80cafe/administracao/imagem" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "url": "https://imagem.example.com/cafe-espresso.jpg",
    "id_produto": 1
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "url": "https://imagem.example.com/cafe-espresso.jpg"
}
```

### 6. Listar Produtos (Público)

```bash
curl -X GET "https://frequency-80-cafe-administracao.onrender.com/v1/frequency80cafe/produto"
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Café Espresso",
    "descricao": "Café espresso tradicional com grãos premium",
    "preco": 8.50,
    "categoria": [{"id": 1, "categoria": "Bebidas Quentes"}],
    "imagem": [{"id": 1, "url": "https://imagem.example.com/cafe-espresso.jpg"}]
  }
]
```

## 📊 Modelos de Dados

### Admin
```json
{
  "id": "integer",
  "nome_usuario": "string (6-100 caracteres)",
  "email": "string (email válido, 7-255 caracteres)",
  "senha": "string (8-100 caracteres)"
}
```

### Categoria
```json
{
  "id": "integer",
  "categoria": "string (máx 45 caracteres)"
}
```

### Imagem
```json
{
  "id": "integer",
  "url": "string (URI válida, máx 255 caracteres)",
  "id_produto": "integer"
}
```

### Produto
```json
{
  "id": "integer",
  "nome": "string (máx 100 caracteres)",
  "descricao": "string",
  "preco": "number (0.00 - 999.99)",
  "categoria": ["array de objetos Categoria"],
  "imagem": ["array de objetos Imagem"]
}
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js (v14.0.0 ou superior)
- npm

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/gustavidal/pi-cafeteria-ds2t-backend-admin
cd pi-cafeteria-ds2t-backend-admin
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor:**
```bash
node app.js
```

O servidor será iniciado em `http://localhost:8080`

## 🔐 Segurança

- ✅ Autenticação JWT para endpoints administrativos
- ✅ Validação de entrada de dados
- ✅ Criptografia de senhas
- ✅ Rate limiting
- ✅ HTTPS em produção
- ✅ CORS configurável

## 📋 Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Erro na requisição |
| 401 | Unauthorized - Autenticação necessária |
| 404 | Not Found - Recurso não encontrado |
| 415 | Unsupported Media Type - Content-Type inválido |
| 500 | Internal Server Error - Erro no servidor |

## 🚨 Tratamento de Erros

Todas as respostas de erro incluem mensagens descritivas:

```json
{
  "error": "Descrição do erro",
  "status": false,
  "status_code": 500
}
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para Frequency 80 Cafe**

# 🍽️ Frequency 80 Cafe - API de Controle de Produtos

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0.3-85EA2D?style=flat-square)](https://swagger.io/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green?style=flat-square)](LICENSE)

> API RESTful para gerenciamento de produtos, categorias e imagens da cafeteria temática "Frequency 80 Cafe"

## 📋 Sobre o Projeto

Esta é uma API robusta e segura para controle de produtos destinada à cafeteria temática **Frequency 80 Cafe**. A API fornece endpoints para gerenciamento administrativo completo e acesso público aos dados de produtos, categorias e imagens através da landing page.

**Versão:** 1.0.0  
**Contato:** [gustavovidalgva@gmail.com](mailto:gustavovidalgva@gmail.com)  
**Licença:** Apache 2.0

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **JavaScript** - Linguagem de programação
- **OpenAPI 3.0.3** - Especificação e documentação da API
- **JWT (JSON Web Tokens)** - Autenticação segura
- **RESTful** - Arquitetura de API

## 📁 Estrutura do Projeto

```
├── routes/
│   ├── admin/           # Rotas de autenticação e gerenciamento de admins
│   ├── categoria/       # Rotas de gerenciamento de categorias
│   ├── imagem/          # Rotas de gerenciamento de imagens
│   └── produto/         # Rotas de gerenciamento de produtos
├── controllers/         # Lógica de negócio
├── models/             # Modelos de dados
├── middleware/         # Middlewares (autenticação, validação)
├── openapi.yaml        # Documentação OpenAPI
├── package.json        # Dependências do projeto
└── README.md           # Este arquivo
```

## 🔗 URL Base

```
https://frequency-80-cafe-administracao.onrender.com/
```

## 🔐 Autenticação

A API utiliza **Bearer Token JWT** para autenticação de endpoints administrativos.

### Como obter um token:

1. Realize o login através do endpoint `/v1/frequency80cafe/administracao/admin/login`
2. Envie as credenciais (login e senha)
3. Receba um token JWT na resposta
4. Inclua o token no header `Authorization: Bearer <token>` em requisições autenticadas

## 📚 Documentação Interativa

Acesse a documentação completa e teste os endpoints em tempo real:

- **Swagger UI:** `https://frequency-80-cafe-administracao.onrender.com/api-docs`
- **OpenAPI YAML:** `https://frequency-80-cafe-administracao.onrender.com/openapi.yaml`

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
- npm ou yarn

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/gustavidal/frequency-80-cafe-api.git
cd frequency-80-cafe-api
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

4. **Inicie o servidor:**
```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`

## 🔧 Scripts Disponíveis

```bash
# Inicia o servidor em modo desenvolvimento
npm start

# Inicia o servidor com hot-reload
npm run dev

# Executa os testes
npm test

# Lint do código
npm run lint
```

## 📝 Variáveis de Ambiente

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=frequency80cafe
DB_USER=admin
DB_PASSWORD=senha_segura

# Autenticação JWT
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRE=7d

# Ambiente
CORS_ORIGIN=*
API_VERSION=v1
```

## 🔐 Segurança

- ✅ Autenticação JWT para endpoints administrativos
- ✅ Validação de entrada de dados
- ✅ Proteção contra CSRF
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
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📞 Suporte e Contato

Para dúvidas ou sugestões sobre a API, entre em contato:

**Email:** [gustavovidalgva@gmail.com](mailto:gustavovidalgva@gmail.com)

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença Apache 2.0 - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para Frequency 80 Cafe**

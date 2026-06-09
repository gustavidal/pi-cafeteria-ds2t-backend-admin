// Import das dependências para criar a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

// Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))



//**************************//
// ENDPOINTS - Tabela "ADMIN"
//**************************//
const controllerAdmin = require('./controller/admin/controller_admin.js')

app.post('/v1/frequency80cafe/administracao/admin', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerAdmin.inserirNovoAdmin(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/frequency80cafe/administracao/admin', async function (request, response) {
    let result = await controllerAdmin.listarAdmin()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/frequency80cafe/administracao/admin/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerAdmin.buscarAdmin(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/frequency80cafe/administracao/admin/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerAdmin.atualizarAdmin(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/frequency80cafe/administracao/admin/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerAdmin.excluirAdmin(id)

    response.status(result.status_code)
    response.json(result)
})

app.post('/v1/frequency80cafe/administracao/admin/login', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerAdmin.loginAdmin(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})



// Iniciar a API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})
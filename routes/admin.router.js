/*******************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas do admin.
 * Autor: Gustavo Vidal de Abreu
 * Data: 10/06/2026 (quarta-feira)
 * Versão: 1.0
*******************************************************************/

// Import do express
const express = require('express')

// Import do body-parser
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import da controller de admin
const controllerAdmin = require('./controller/admin/controller_admin.js')

/************************ENDPOINTS************************/
router.post('/', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerAdmin.inserirNovoAdmin(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerAdmin.listarAdmin()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerAdmin.buscarAdmin(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerAdmin.atualizarAdmin(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerAdmin.excluirAdmin(id)

    response.status(result.status_code)
    response.json(result)
})

router.post('/login', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerAdmin.loginAdmin(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Export do objeto de rotas de gênero cênico
module.exports = router
/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação do token de acesso JWT do administrador.
 * Autor: Gustavo Vidal de Abreu
 * Data: 12/06/2026 (sexta-feira)
 * Versão: 1.0
*************************************************************************************/

// Import da controller de admin
const controllerAdmin = require('../controller/admin/controller_admin.js')

// Função que verifica a autenticação do admin
const autenticar = async function (request, response, next) {
    const token = request.headers.authorization

    const validar = await controllerAdmin.validarToken(token)

    if (validar) {
        return response.status(validar.status_code).json(validar)
    }

    next()
}

module.exports = autenticar
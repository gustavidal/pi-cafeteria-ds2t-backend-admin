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
    // Busca o token
    const token = request.headers.authorization

    // Chama a função de validação do token
    const validar = await controllerAdmin.validarToken(token)

    // Validação
    if (validar) {
        // Caso entre, retorna em uma mensagem de erro
        validar.field = "[TOKEN JWT] não informado, inválido ou expirado."
        return response.status(validar.status_code).json(validar)
    } else {
        // Caso não, token é válido e permite as funcionalidade de administrador
        next()
    }
}

module.exports = autenticar
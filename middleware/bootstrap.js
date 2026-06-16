/***********************************************************************************
 * Objetivo: Arquivo responsável pela verificação da existência de admins no sistema.
 * Autor: Gustavo Vidal de Abreu
 * Data: 15/06/2026 (segunda-feira)
 * Versão: 1.0
***********************************************************************************/

// Import do DAO do admin
const adminDAO = require('../model/DAO/admin/admin.js')

// Import do arquivo de verificação de JWT (login)
const autenticar = require('./auth.js')

// Função que verifica a existência de admins cadastrados no sitema
const bootstrap = async function (request, response, next) {
    // Chama o DAO de admins
    let listaAdmins = await adminDAO.selectAllAdmin()

    // Verifica se existe admins cadastrados
    if (listaAdmins && listaAdmins.length > 0) {
        // Caso sim, chama a função de autenticação de token
        return autenticar(request, response, next)
    } else {
        // Caso não, permite continuar na funçao sem nenhum alarde
        next()
    }
}

module.exports = bootstrap
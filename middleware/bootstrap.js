/************************************************************************************************************************************
 * Objetivo: Permite o cadastro livre apenas se não houver nenhum admin no sistema; caso já exista, exige autenticação via token JWT.
 * Autor: Gustavo Vidal de Abreu
 * Data: 12/06/2026 (sexta-feira)
 * Versão: 1.0
************************************************************************************************************************************/

const adminDAO = require('../model/DAO/admin/admin.js')
const autenticar = require('./auth.js')

const bootstrap = async function (request, response, next) {
    let listaAdmins = await adminDAO.selectAllAdmin()

    if (listaAdmins && listaAdmins.length > 0) {
        return autenticar(request, response, next)
    }

    next()
}

module.exports = bootstrap
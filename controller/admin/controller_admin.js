/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de admin.
 * Autor: Gustavo Vidal de Abreu
 * Data: 09/06/2026 (terça-feira)
 * Versão: 1.0
***************************************************************************************************************/

// Import da biblioteca de criptografia de senhas (BCrypt)
const bcrypt = require('bcrypt')

// Import da biblioteca de geração de tokens de acesso (jwt)
const jwt = require('jsonwebtoken')

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de admin no Banco de Dados
const adminDAO = require('../../model/DAO/admin/admin.js')

const inserirNovoAdmin = async function (admin, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(admin)

            if (validar) {
                return validar // status-code: 400
            } else {
                const saltRounds = 10
                admin.senha = await bcrypt.hash(admin.senha, saltRounds)

                let result = await adminDAO.insertAdmin(admin)

                if (result) {
                    delete admin.senha

                    admin.id = result

                    customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response    = admin

                    return customMessages.DEFAULT_MESSAGE // status-code: 201
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarAdmin = async function (admin, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let buscarAdminResult = await buscarAdmin(id)

            if (buscarAdminResult.status) {
                let validar = await validarDados(admin)

                if (!validar) {
                    admin.id = Number(id)

                    const saltRounds = 10
                    admin.senha = await bcrypt.hash(admin.senha, saltRounds)

                    let result = await adminDAO.updateAdmin(admin)

                    if (result) {
                        delete admin.senha

                        customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response    = admin

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarAdminResult // status-code: 400 (id) ou 404 (not found)
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarAdmin = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await adminDAO.selectAllAdmin()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.admins = result

                return customMessages.DEFAULT_MESSAGE // status-code: 200
            } else {
                return customMessages.ERROR_NOT_FOUND // status-code: 404
            }
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const buscarAdmin = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await adminDAO.selectByIdAdmin(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.admin = result

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_NOT_FOUND // status-code: 404
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirAdmin = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarAdminResult = await buscarAdmin(id)

        if (buscarAdminResult.status) {
            let result = await adminDAO.deleteAdmin(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarAdminResult // status-code: 400 (id) ou 404 (not found)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const loginAdmin = async function (admin, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (admin.login == undefined || admin.login == '' || admin.login == null || admin.login.length < 6 || admin.login.length > 255) {
                customMessages.ERROR_BAD_REQUEST.field = '[LOGIN] INVÁLIDO'
                return customMessages.ERROR_BAD_REQUEST // status-code: 400
            } else if (admin.senha == undefined || admin.senha == '' || admin.senha == null || admin.senha.length < 8 || admin.senha.length > 100) {
                customMessages.ERROR_BAD_REQUEST.field = '[SENHA] INVÁLIDA'
                return customMessages.ERROR_BAD_REQUEST // status-code: 400
            } else {
                let result = await adminDAO.selectByLoginAdmin(admin.login)

                if (result) {
                    if (result.length > 0) {
                        const senhaValida = await bcrypt.compare(admin.senha, result[0].senha)

                        if (senhaValida) {
                            delete admin.senha

                            let resultBuscarAdmin = await buscarAdmin(result[0].id)

                            if (resultBuscarAdmin) {
                                admin = resultBuscarAdmin.response.admin[0]

                                const payload = {
                                    "id": result[0].id,
                                    "login": result[0].nome_usuario
                                }

                                const novoJwt = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' })

                                // Atualiza o JWT no banco
                                let tokenSalvo = await adminDAO.saveTokenAdmin(result[0].id, novoJwt)

                                if (tokenSalvo) {
                                    admin.jwt = novoJwt

                                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_RESPONSE.message
                                    customMessages.DEFAULT_MESSAGE.response.admin = admin

                                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                                } else {
                                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                                }
                            } else {
                                return customMessages.ERROR_UNAUTHORIZED // status-code: 401
                            }
                        } else {
                            return customMessages.ERROR_UNAUTHORIZED // status-code: 401
                        }
                    } else {
                        return customMessages.ERROR_UNAUTHORIZED // status-code: 401
                    }
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (admin) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (admin.nome_usuario == undefined || admin.nome_usuario == '' || admin.nome_usuario == null || admin.nome_usuario.length < 6 || admin.nome_usuario.length > 100) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME DE USUÁRIO] INVÁLIDO'
    } else if (admin.email == undefined || admin.email == '' || admin.email == null || admin.email.length < 7 || admin.email.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[EMAIL] INVÁLIDO'
    } else if (admin.senha == undefined || admin.senha == '' || admin.senha == null || admin.senha.length < 8 || admin.senha.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[SENHA] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

const validarToken = async function (token) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (token == undefined || token == null || token == '') {
            return customMessages.ERROR_UNAUTHORIZED // status-code: 401
        } else {
            const tokenLimpo = String(token).replace('Bearer ', '')
            const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET) // agora "jwt" é a lib

            let result = await adminDAO.selectByIdAdmin(decoded.id)

            if (!result || result.length === 0 || result[0].jwt !== tokenLimpo) {
                return customMessages.ERROR_UNAUTHORIZED // status-code: 401
            } else {
                return false // token válido
            }
        }
    } catch (error) {
        return customMessages.ERROR_UNAUTHORIZED // status-code: 401
    }
}

module.exports = {
    inserirNovoAdmin,
    atualizarAdmin,
    listarAdmin,
    buscarAdmin,
    excluirAdmin,
    loginAdmin,
    validarToken
}
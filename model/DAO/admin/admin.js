/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do admin no banco de dados MySQL.
 * Autor: Gustavo Vidal de Abreu
 * Data: 08/06/2026
 * Versão: 1.0
************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConnection = knex(knexDatabaseConfig.development)

const insertAdmin = async function (admin) {
    try {
        let sql = `
            insert into tbl_admin (
                usuario,
                senha
            ) values (
                '${admin.usuario}',
                '${admin.senha}'
            );
        `

        let result = await knexConnection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateAdmin = async function (admin) {
    try {
        let sql = `
            update tbl_admin set
                usuario = '${admin.usuario}',
                senha   = '${admin.senha}'
            where id = ${admin.id};
        `

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAdmin = async function () {
    try {
        let sql = 'select id, usuario from tbl_admin order by id desc;'

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdAdmin = async function (id) {
    try {
        let sql = `select id, usuario from tbl_admin where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAdmin = async function (id) {
    try {
        let sql = `delete from tbl_admin where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByLoginAdmin = async function (login) {
    try {
        let sql = `
            select * from tbl_admin
            where email = '${login}' or nome_usuario = '${login}';
        `

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertAdmin,
    updateAdmin,
    selectAllAdmin,
    selectByIdAdmin,
    deleteAdmin,
    selectByLoginAdmin
}
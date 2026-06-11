/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do admin no banco de dados MySQL.
 * Autor: Gustavo Vidal de Abreu
 * Data: 08/06/2026 (segunda-feira)
 * Versão: 1.0
************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConnection = knex(knexDatabaseConfig.development)

const insertAdmin = async function (admin) {
    try {
        let sql = `
            insert into tbl_admin (
                nome_usuario,
                email,
                senha,
                jwt
            ) values (
                '${admin.nome_usuario}',
                '${admin.email}',
                '${admin.senha}',
                '${admin.jwt}'
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
                nome_usuario = '${admin.nome_usuario}',
                email        = '${admin.email}',
                senha        = '${admin.senha}',
                jwt          = '${admin.jwt}'
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
        let sql = `
            select id, nome_usuario, email, jwt
            from tbl_admin order by id desc;
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

const selectByIdAdmin = async function (id) {
    try {
        let sql = `
            select id, nome_usuario, email, jwt
            from tbl_admin where id = ${id};
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

const saveTokenAdmin = async function (id, jwt) {
    try {
        let sql = `
        update tbl_admin set
            jwt = '${jwt}'
        where id = ${id}`
        let result = await query(sql)
        return result.affectedRows > 0 ? true : false
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
    saveTokenAdmin,
    selectByLoginAdmin
}
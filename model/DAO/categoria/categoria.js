/****************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de categoria no banco de dados MySQL.
 * Autor: Gustavo Vidal de Abreu
 * Data: 11/06/2026 (quinta-feira)
 * Versão: 1.0
****************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConnection = knex(knexDatabaseConfig.development)

const insertCategoria = async function (categoria) {
    try {
        let sql = `
            insert into tbl_categoria (
                categoria,
                descricao,
                imagem
            ) values (
                '${categoria.categoria}',
                '${categoria.descricao}',
                '${categoria.imagem}'
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

const updateCategoria = async function (categoria) {
    try {
        let sql = `
            update tbl_categoria set
                categoria = '${categoria.categoria}',
                descricao = '${categoria.descricao}',
                imagem    = '${categoria.imagem}'
            where id = ${categoria.id};
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

const selectAllCategoria = async function () {
    try {
        let sql = `
            select * from tbl_categoria order by id desc;
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

const selectByIdCategoria = async function (id) {
    try {
        let sql = `
            select * from tbl_categoria where id = ${id};
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

const deleteCategoria = async function (id) {
    try {
        let sql = `delete from tbl_categoria where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertCategoria,
    updateCategoria,
    selectAllCategoria,
    selectByIdCategoria,
    deleteCategoria
}
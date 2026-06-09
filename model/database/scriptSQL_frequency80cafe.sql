drop database if exists db_frequency80cafe;
create database if not exists db_frequency80cafe;

use db_frequency80cafe;

-- TABELA DE ADMIN
create table tbl_admin (
	id           int not null auto_increment primary key,
    nome_usuario varchar(100) not null,
    email        varchar(255) not null,
    senha_hash   varchar(255) not null
);
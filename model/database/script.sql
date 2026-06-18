drop database if exists db_frequency80cafe;
create database if not exists db_frequency80cafe;
use db_frequency80cafe;

create table tbl_admin (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(512) NOT NULL,
    jwt VARCHAR(255) NOT NULL
);

create table tbl_produto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(5, 2) NOT NULL
);

create table tbl_categoria (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(45) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL
);

create table tbl_produto_categoria (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_CATEGORIA_PRODUTO_CATEGORIA
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categoria (id),
    
    CONSTRAINT FK_PRODUTO_PRODUTO_CATEGORIA
    FOREIGN KEY (id_produto) 
    REFERENCES tbl_produto (id)
);

create table tbl_imagem (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_IMAGEM_PRODUTO
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
);



-- ------------------------------------------------------------
-- Tabela de log de exclusões (auditoria)
-- ------------------------------------------------------------
create table if not exists tbl_log_exclusao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tabela_origem VARCHAR(100) NOT NULL,
    id_registro INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data_exclusao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

-- ------------------------------------------------------------
-- TRIGGER: antes de excluir um PRODUTO
-- Remove vínculos em tbl_produto_categoria e tbl_imagem
-- (evita erro de violação de chave estrangeira)
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_before_delete_produto$$

CREATE TRIGGER trg_before_delete_produto
BEFORE DELETE ON tbl_produto
FOR EACH ROW
BEGIN
    DELETE FROM tbl_produto_categoria WHERE id_produto = OLD.id;
    DELETE FROM tbl_imagem WHERE id_produto = OLD.id;
END$$

-- ------------------------------------------------------------
-- TRIGGER: depois de excluir um PRODUTO
-- Registra a exclusão no log de auditoria
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_after_delete_produto$$

CREATE TRIGGER trg_after_delete_produto
AFTER DELETE ON tbl_produto
FOR EACH ROW
BEGIN
    INSERT INTO tbl_log_exclusao (tabela_origem, id_registro, descricao)
    VALUES ('tbl_produto', OLD.id, CONCAT('Produto excluído: ', OLD.nome));
END$$

-- ------------------------------------------------------------
-- TRIGGER: antes de excluir uma CATEGORIA
-- Remove vínculos em tbl_produto_categoria
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_before_delete_categoria$$

CREATE TRIGGER trg_before_delete_categoria
BEFORE DELETE ON tbl_categoria
FOR EACH ROW
BEGIN
    DELETE FROM tbl_produto_categoria WHERE id_categoria = OLD.id;
END$$

-- ------------------------------------------------------------
-- TRIGGER: depois de excluir uma CATEGORIA
-- Registra a exclusão no log de auditoria
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_after_delete_categoria$$

CREATE TRIGGER trg_after_delete_categoria
AFTER DELETE ON tbl_categoria
FOR EACH ROW
BEGIN
    INSERT INTO tbl_log_exclusao (tabela_origem, id_registro, descricao)
    VALUES ('tbl_categoria', OLD.id, CONCAT('Categoria excluída: ', OLD.categoria));
END$$

-- ------------------------------------------------------------
-- TRIGGER: depois de excluir uma IMAGEM
-- Registra a exclusão no log de auditoria
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_after_delete_imagem$$

CREATE TRIGGER trg_after_delete_imagem
AFTER DELETE ON tbl_imagem
FOR EACH ROW
BEGIN
    INSERT INTO tbl_log_exclusao (tabela_origem, id_registro, descricao)
    VALUES ('tbl_imagem', OLD.id, CONCAT('Imagem excluída: ', OLD.url));
END$$

-- ------------------------------------------------------------
-- TRIGGER: depois de excluir um ADMIN
-- Registra a exclusão no log de auditoria
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_after_delete_admin$$

CREATE TRIGGER trg_after_delete_admin
AFTER DELETE ON tbl_admin
FOR EACH ROW
BEGIN
    INSERT INTO tbl_log_exclusao (tabela_origem, id_registro, descricao)
    VALUES ('tbl_admin', OLD.id, CONCAT('Admin excluído: ', OLD.nome_usuario));
END$$

DELIMITER ;
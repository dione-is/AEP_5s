-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE entregador+veiculo (
veiculo Texto(1),
conta_bancaria Texto(1),
id_entregador Texto(1),
modelo Texto(1),
id_veiculo Texto(1),
placa Texto(1),
alimenticio Texto(1),
capacidade_carga Texto(1),
codigo_pedido Texto(1),
PRIMARY KEY(id_entregador,id_veiculo)
)

CREATE TABLE pessoa (
id_pessoa Texto(1) PRIMARY KEY,
nome Texto(1),
email Texto(1),
telefone Texto(1),
codigo_pedido Texto(1),
id_endereco Texto(1)
)

CREATE TABLE pedido (
codigo_pedido Texto(1) PRIMARY KEY,
declaracao_conteudo Texto(1),
status Texto(1),
destinatario_nome Texto(1),
horario_entrega Texto(1),
horario_coleta Texto(1),
destinatario_telefone Texto(1),
forma_pagamento Texto(1),
veiculo Texto(1),
pagamento Texto(1),
preco Texto(1)
)

CREATE TABLE endereco (
remetente Texto(1),
destinatario Texto(1),
id_endereco Texto(1) PRIMARY KEY
)

CREATE TABLE pessoafisica (
id_fisica Texto(1) PRIMARY KEY,
cpf Texto(1),
id_pessoa Texto(1),
FOREIGN KEY(id_pessoa) REFERENCES pessoa (id_pessoa)
)

CREATE TABLE pessoajuridica (
id_juridica Texto(1) PRIMARY KEY,
cnpj Texto(1),
id_pessoa Texto(1),
FOREIGN KEY(id_pessoa) REFERENCES pessoa (id_pessoa)
)

ALTER TABLE entregador+veiculo ADD FOREIGN KEY(codigo_pedido) REFERENCES pedido (codigo_pedido)
ALTER TABLE pessoa ADD FOREIGN KEY(codigo_pedido) REFERENCES pedido (codigo_pedido)
ALTER TABLE pessoa ADD FOREIGN KEY(id_endereco) REFERENCES endereco (id_endereco)

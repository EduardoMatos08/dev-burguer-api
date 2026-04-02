// Importando o módulo path para resolver caminhos de arquivos
const { resolve } = require("node:path");
const express = require("express");

// Caminho onde os arquivos serão armazenados
const uploadPath = resolve(__dirname, "..", "..", "uploads");
fileRouteConfig = express.static(uploadPath);

module.exports = fileRouteConfig;

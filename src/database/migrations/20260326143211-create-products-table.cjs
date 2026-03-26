"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /*
          Criar tabela de produtos com:
          - id: chave primária, auto-incremento
          - name: string, não nulo
          - price: decimal, não nulo
          - path: string, nulo (para armazenar caminho da imagem)
          - category: string, não nulo
          - created_at: data de criação
          - updated_at: data de atualização
        */

        await queryInterface.createTable("products", {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.FLOAT(10, 2),
            },
            path: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            category: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        // Remover tabela de produtos
        await queryInterface.dropTable("products");
    },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /*
          Criar tabela de categorias com:
          - id: chave primária, auto-incremento
          - name: string, não nulo
          - created_at: data de criação
          - updated_at: data de atualização
        */

        await queryInterface.createTable("categories", {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
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
        // Remover tabela de categorias
        await queryInterface.dropTable("categories");
    },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("products", "category_id", {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            references: {
                model: "categories",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            allowNull: false,
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.removeColumn("products", "category_id");
    },
};

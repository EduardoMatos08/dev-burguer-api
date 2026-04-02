"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("products", "in_offer", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.removeColumn("products", "in_offer");
    },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tratamientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreTratamiento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaInicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fechaFinal: {
        type: Sequelize.DATE,
        allowNull: false
      },
      intervaloDosis: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('activo', 'finalizado'), // Usamos ENUM para limitar los valores posibles
        defaultValue: 'activo', // Establece un valor por defecto
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tratamientos');
  }
};
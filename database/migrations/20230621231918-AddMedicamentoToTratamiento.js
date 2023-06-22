'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Tratamientos',
        'tratamientoId',
        {
          type:Sequelize.DataTypes.INTEGER,
          references:{
            model: 'Medicamentos',
            key: 'id',
          },
          onUpdate:'CASCADE',
          onDelete:'SET NULL',
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'Tratamoientos',
        'tratamientoId',
      )
    ]);
  }
};

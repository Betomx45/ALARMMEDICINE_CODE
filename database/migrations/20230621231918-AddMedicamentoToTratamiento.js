'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Medicamentos',
        'tratamientoId',
        {
          type:Sequelize.DataTypes.INTEGER,
          references:{
            model: 'Tratamientos',
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
        'Medicamentos',
        'tratamientoId',
      )
    ]);
  }
};

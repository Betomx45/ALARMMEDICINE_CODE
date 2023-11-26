'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'medicamentos',
        'tratamientoId',
        {
          type:Sequelize.DataTypes.INTEGER,
          references:{
            model: 'tratamientos',
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
        'medicamentos',
        'tratamientoId',
      )
    ]);
  }
};

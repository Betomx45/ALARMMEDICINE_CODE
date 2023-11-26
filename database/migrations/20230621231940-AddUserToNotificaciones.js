'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'notificaciones',
        'usuarioId',
        {
          type:Sequelize.DataTypes.INTEGER,
          references:{
            model: 'usuarios',
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
        'notificaciones',
        'usuarioId',
      )
    ]);
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Usuarios',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.STRING(128),
          allowNull: true , 
          after: 'password',
        },
      ),
      queryInterface.addColumn(
        'Usuarios',
        'passwordResetExpire',
        {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: true , 
          after: 'passwordResetToken',
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Usuarios', 'passwordResetToken'),
      queryInterface.removeColumn('Usuarios', 'passwordResetExpire'),
    ]);
  }
};

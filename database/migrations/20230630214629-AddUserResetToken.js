'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'usuarios',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.STRING(128),
          allowNull: true , 
          after: 'password',
        },
      ),
      queryInterface.addColumn(
        'usuarios',
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
      queryInterface.removeColumn('usuarios', 'passwordResetToken'),
      queryInterface.removeColumn('usuarios', 'passwordResetExpire'),
    ]);
  }
};

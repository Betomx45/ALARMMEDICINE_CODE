'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Notificaciones.belongsTo(models.Usuario,
        {
          as:'notificacion',
          foreignKey:'usuarioId'
        }
        )
    }
  }
  Notificaciones.init({
    message: DataTypes.STRING,
    usuarioId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notificaciones',
  });
  return Notificaciones;
};
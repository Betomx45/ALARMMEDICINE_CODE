'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Usuario.hasMany(models.Tratamiento,
        {
          as:'tratamiento',
          foreignKey:'userId'
        }
        )

        models.Usuario.hasMany(models.Notificaciones,
          {
            as:'notificaciones',
            foreignKey:'usuarioId'
          }
          )
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
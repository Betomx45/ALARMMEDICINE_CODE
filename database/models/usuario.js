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
      models.Usuarios.hasMany(models.Tratamientos,
        {
          as:'tratamiento',
          foreignKey:'usuarioId'
        }
        )

        models.Usuario.hasMany(models.Notificaciones,
          {
            as:'usuario',
            foreignKey:'usuarioId'
          }
          )
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
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
    name: {
      type:DataTypes.STRING(60),
      allowNull:false,
      validate:{
        notNull:{
          msg:'Elnombre es obligatorio'
        },
        is:{
          args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
          msg:'Elnombre sólo debe contener texto'
        },
      },
    },
    email: {
      type:DataTypes.STRING(255),
      allowNull:false,
      unique:{
        msg:'El email ingresado ya fue registrado'
      },
      validate:{
        notNull:{
          msg:'Este campo es obligatorio',
        },
        isEmail:{
          msg:'Debe ingresar un email valido'
        },
      },
    },
    password: {
      type:DataTypes.STRING(255),
      allowNull:false,
      validate:{
        notNull:{
          msg:'Este campo es obligatorio',
        },
        len:{
          args: [8,255],
          msg: 'La contraseña debe contener minimo 8 caracteres '
        },
      },
    },
    passwordResetToken: DataTypes.STRING(128),
    passwordResetExpire: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tratamiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tratamiento.belongsTo(models.Usuario,
        {
          as:'usuario',
          foreignKey:'userId'
        }
      );

      models.Tratamiento.hasMany(models.Medicamento,
        {
          as:'medicamento',
          foreignKey:'tratamientoId'
        }
      )
    }
  }
  Tratamiento.init({
    nombreTratamiento: {
      type:DataTypes.STRING(60),
      allowNull:false,
      validate:{
        notNull:{
          msg:'El nombre del tratamiento es obligatorio'
        },
        is:{
          args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
          msg:'El nombre sólo debe contener texto'
        },
      },
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo es obligatorio'
        },
        /*
        isDate: {
          msg: 'La fecha de inicio debe ser valida'
        }*/
      },
    },
    fechaFinal: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo es obligatorio',
        },
        isDate: {
          msg: 'La segunda fecha debe ser valida'
        }
      },
    },
    intervaloDosis: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Este campo es obligatorio'
        },
        isInt:{
          msg: 'Debes ingresar un número'
        },
      },
    },
    status: {
      type: DataTypes.ENUM('activo', 'finalizado'),
      defaultValue: 'activo', // Establece 'activo' como valor por defecto
      allowNull: false,
    },
    userId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Tratamiento',
  });
  return Tratamiento;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ubicacion.init({
    latitud: {
     type:DataTypes.FLOAT,
     allowNull:false,
     validate: {
      notNull: {
        msg: 'Este campo es obligatorio'
      },
      isFloat: {
        msg: 'La latitud debe ser un número valido'
      }
    },
    },
    longitud: {
     type:DataTypes.FLOAT,
     allowNull:false,
     validate: {
      notNull: {
        msg: 'Este campo es obligatorio'
      },
      isFloat: {
        msg: 'La longitud debe ser un número valido'
      }
    },
    }
  }, {
    sequelize,
    modelName: 'Ubicacion',
  });
  return Ubicacion;
};
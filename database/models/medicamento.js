'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Medicamento.belongsTo(models.Tratamiento,
        {
          as:'tratamiento',
          foreignKey:'tratamientoId'
        }
        );
    }
  }
  Medicamento.init({
    nombre: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Este campo es obligatorio"
        },
        is:{
          args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
          msg:'El nombre del medicamento sólo debe contener texto'
        },
      },
    },
    descripcion: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Este campo es obligatorio"
        },
        is:{
          args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
          msg:'La descripción del medicamento sólo debe contener texto'
        },
      }
    },
    tratamientoId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicamento',
  });
  return Medicamento;
};
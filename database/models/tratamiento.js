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
      models.Tratamientos.belongsTo(models.Usuario,
        {
          as:'usuario',
          foreignKey:'usuarioId'
        }
        );

        models.Tratamiento.hasMany(models.Medicamentos,
          {
            as:'Medicamento',
            foreignKey:'usuarioId'
          }
          )
    }
  }
  Tratamiento.init({
    fechaInicio: DataTypes.DATE,
    fechaFinal: DataTypes.DATE,
    intervaloDosis: DataTypes.TIME,
    userId:DataTypes.INTEGER,
    medicamentoId:DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Tratamiento',
  });
  return Tratamiento;
};
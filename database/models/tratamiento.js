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
            foreignKey:'medicamentoId'
          }
          )
    }
  }
  Tratamiento.init({
    fechaInicio: DataTypes.DATE,
    fechaFinal: DataTypes.DATE,
    intervaloDosis: DataTypes.TIME,
    userId:DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Tratamiento',
  });
  return Tratamiento;
};
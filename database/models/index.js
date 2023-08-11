'use strict';
import mysql2 from "mysql2";
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

if(config.dialect === 'mysql'){
  config.dialectModule = mysql2;
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

import tratamiento from './tratamiento';
import usuario from './usuario';
import medicamento from './medicamento';
import notificaciones from './notificaciones';
import ubicacion from './ubicacion';
/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
*/

db.Tratamiento = tratamiento(sequelize, Sequelize.DataTypes);
db.Usuario = usuario(sequelize, Sequelize.DataTypes);
db.Medicamento = medicamento(sequelize, Sequelize.DataTypes);
db.Notificaciones = notificaciones(sequelize, Sequelize.DataTypes);
db.Ubicacion = ubicacion(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

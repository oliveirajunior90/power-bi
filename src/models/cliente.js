'use strict';
module.exports = (sequelize, DataTypes) => {
  const cliente = sequelize.define('cliente', {
    nome: DataTypes.STRING
  }, {});
  cliente.associate = function(models) {
    // associations can be defined here
  };
  return cliente;
};
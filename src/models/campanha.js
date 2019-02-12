'use strict';
module.exports = (sequelize, DataTypes) => {
  const campanha = sequelize.define('campanha', {
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE,
    vistaGA: DataTypes.STRING,
    facebookAdAccountId: DataTypes.STRING,
    gadsId: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {});
  campanha.associate = function(models) {
    campanha.belongsTo(models.cliente, {foreignKey: 'clienteId'});
  };
  return campanha;
};
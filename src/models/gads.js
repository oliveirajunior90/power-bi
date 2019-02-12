'use strict';
module.exports = (sequelize, DataTypes) => {
  const gads = sequelize.define('gads', {
    date: DataTypes.STRING,
    campaignName: DataTypes.STRING,
    impressions: DataTypes.STRING,
    clicks: DataTypes.STRING,
    cost: DataTypes.STRING,
    effectiveFinalUrl: DataTypes.STRING,
    viewViews: DataTypes.STRING
  }, {});
  gads.associate = function(models) {
    gads.belongsTo(models.campanha, {foreignKey: 'campanhaId'});  };
  return gads;
};
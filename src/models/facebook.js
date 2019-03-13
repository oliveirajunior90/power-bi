'use strict';
module.exports = (sequelize, DataTypes) => {
  const facebook = sequelize.define('facebook', {
    dateStart: DataTypes.STRING,
    dateStop: DataTypes.STRING,
    accountId: DataTypes.STRING,
    accountName: DataTypes.STRING,
    campaignName: DataTypes.STRING,
    adsetName: DataTypes.STRING,
    adName: DataTypes.STRING,
    impressions: DataTypes.STRING,
    spend: DataTypes.STRING
  }, {});
  facebook.associate = function(models) {
    facebook.belongsTo(models.campanha, {foreignKey: 'campanhaId'});  };
  return facebook;
};
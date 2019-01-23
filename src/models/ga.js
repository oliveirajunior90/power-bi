'use strict';
module.exports = (sequelize, DataTypes) => {
  const GA = sequelize.define('GA', {
    date: DataTypes.STRING,
    campaign: DataTypes.STRING,
    source: DataTypes.STRING,
    medium: DataTypes.STRING,
    sessions: DataTypes.INTEGER,
    impressions: DataTypes.INTEGER
  }, {});
  GA.associate = function(models) {
    // associations can be defined here
  };
  return GA;
};
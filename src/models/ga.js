'use strict';
module.exports = (sequelize, DataTypes) => {
  const ga = sequelize.define('ga', {
    date: DataTypes.STRING,
    campaign: DataTypes.STRING,
    campaign: DataTypes.STRING,
    source: DataTypes.STRING,
    medium: DataTypes.STRING,
    sessions: DataTypes.STRING,
    impressions: DataTypes.STRING,
    keyword: DataTypes.STRING,
    goal1completions: DataTypes.STRING,
    goal2completions: DataTypes.STRING,
    goal3completions: DataTypes.STRING,
    goal4completions: DataTypes.STRING,
    goal5completions: DataTypes.STRING,
    goal6completions: DataTypes.STRING,
    goal7completions: DataTypes.STRING,
    goal8completions: DataTypes.STRING,
    goal9completions: DataTypes.STRING,
    goal10completions: DataTypes.STRING,
    goal11completions: DataTypes.STRING,
    goal12completions: DataTypes.STRING,
    goal13completions: DataTypes.STRING,
    goal14completions: DataTypes.STRING,
    goal15completions: DataTypes.STRING,
    goal16completions: DataTypes.STRING,
    goal17completions: DataTypes.STRING,
    goal18completions: DataTypes.STRING,
    goal19completions: DataTypes.STRING,
    goal20completions: DataTypes.STRING
  }, {});
  ga.associate = function(models) {
    ga.belongsTo(models.campanha, {foreignKey: 'campanhaId'});  };
  return ga;
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      campanhaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'campanhas', // 'persons' refers to table name
          key: 'id', // 'id' refers to column name in persons table
          onDelete: 'CASCADE'
       }
      },

      date: {
        type: Sequelize.STRING
      },
      campaign: {
        type: Sequelize.STRING
      },
      campaign: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      medium: {
        type: Sequelize.STRING
      },
      sessions: {
        type: Sequelize.STRING
      },
      impressions: {
        type: Sequelize.STRING
      },
      keyword: {
        type: Sequelize.STRING
      },
      goal1completions: {
        type: Sequelize.STRING
      },
      goal2completions: {
        type: Sequelize.STRING
      },
      goal3completions: {
        type: Sequelize.STRING
      },
      goal4completions: {
        type: Sequelize.STRING
      },
      goal5completions: {
        type: Sequelize.STRING
      },
      goal6completions: {
        type: Sequelize.STRING
      },
      goal7completions: {
        type: Sequelize.STRING
      },
      goal8completions: {
        type: Sequelize.STRING
      },
      goal9completions: {
        type: Sequelize.STRING
      },
      goal10completions: {
        type: Sequelize.STRING
      },
      goal11completions: {
        type: Sequelize.STRING
      },
      goal12completions: {
        type: Sequelize.STRING
      },
      goal13completions: {
        type: Sequelize.STRING
      },
      goal14completions: {
        type: Sequelize.STRING
      },
      goal15completions: {
        type: Sequelize.STRING
      },
      goal16completions: {
        type: Sequelize.STRING
      },
      goal17completions: {
        type: Sequelize.STRING
      },
      goal18completions: {
        type: Sequelize.STRING
      },
      goal19completions: {
        type: Sequelize.STRING
      },
      goal20completions: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gas');
  }
};
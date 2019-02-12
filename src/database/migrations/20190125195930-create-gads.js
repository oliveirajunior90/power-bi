'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gads', {
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
      campaignName: {
        type: Sequelize.STRING
      },
      impressions: {
        type: Sequelize.STRING
      },
      clicks: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.STRING
      },
      effectiveFinalUrl: {
        type: Sequelize.STRING
      },
      viewViews: {
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
    return queryInterface.dropTable('gads');
  }
};
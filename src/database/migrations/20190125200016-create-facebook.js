'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('facebooks', {
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

      dateStart: {
        type: Sequelize.STRING
      },
      dateStop: {
        type: Sequelize.STRING
      },
      accountId: {
        type: Sequelize.STRING
      },
      accountName: {
        type: Sequelize.STRING
      },
      campaignName: {
        type: Sequelize.STRING
      },
      adsetName: {
        type: Sequelize.STRING
      },
      adName: {
        type: Sequelize.STRING
      },
      impressions: {
        type: Sequelize.STRING
      },
      spend: {
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
    return queryInterface.dropTable('facebooks');
  }
};
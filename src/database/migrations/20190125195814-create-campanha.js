'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('campanhas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes', // 'persons' refers to table name
          key: 'id', // 'id' refers to column name in persons table
          onDelete: 'CASCADE'
       }
      },

      dataInicio: {
        type: Sequelize.DATE
      },
      dataFim: {
        type: Sequelize.DATE
      },
      vistaGA: {
        type: Sequelize.STRING
      },
      facebookAdAccountId: {
        type: Sequelize.STRING
      },
      slug: {
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
    return queryInterface.dropTable('campanhas');
  }
};
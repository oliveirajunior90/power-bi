'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.addColumn(
        'campanhas',
        'gadsId',
        Sequelize.STRING
      ),

      queryInterface.addColumn(
        'campanhas',
        'status',
        Sequelize.BOOLEAN
      )

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

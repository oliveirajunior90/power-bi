'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'campanhas',
      'statusGads',
      Sequelize.BOOLEAN
    )

    queryInterface.addColumn(
      'campanhas',
      'statusGa',
      Sequelize.BOOLEAN
    )

    queryInterface.addColumn(
      'campanhas',
      'statusFacebook',
      Sequelize.BOOLEAN
    )

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'campanhas',
      'status'
    );

  }
};

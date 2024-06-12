'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('foods', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      recipeUri: {
        type: Sequelize.STRING(85), // max length 83, rounded to multiple of 5
        allowNull: false
      },
      recipeName: {
        type: Sequelize.STRING(130), // max length 127, rounded to multiple of 5
        allowNull: false
      },
      calories: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      sugarContent: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      dietLabels: {
        type: Sequelize.STRING(45), // max length 45, already multiple of 5
        allowNull: false
      },
      ingredients: {
        type: Sequelize.STRING(1480), // max length 1479, rounded to multiple of 5
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(355), // max length 355, already multiple of 5
        allowNull: false
      },
      instructionUrl: {
        type: Sequelize.STRING(160), // max length 159, rounded to multiple of 5
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('foods');
  }
};

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
        type: Sequelize.STRING(85),
        allowNull: false
      },
      recipeName: {
        type: Sequelize.STRING(130),
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
        type: Sequelize.STRING(45),
        allowNull: false
      },
      ingredients: {
        type: Sequelize.STRING(1480),
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(355),
        allowNull: false
      },
      instructionUrl: {
        type: Sequelize.STRING(160),
        allowNull: false
      },
      servings: {
        type: Sequelize.INTEGER,
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

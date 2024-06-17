'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Food.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipeUri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sugarContent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dietLabels: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructionUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    // tambahin serving
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'foods',
    timestamps: true,
  });
  return Food;
};

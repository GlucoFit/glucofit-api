'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.hasMany(models.Favorite, { foreignKey: 'foodId', as: 'favorites' });
    }
  }
  Food.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    recipeUri: {
      type: DataTypes.STRING(85),
      allowNull: false
    },
    recipeName: {
      type: DataTypes.STRING(130),
      allowNull: false
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    sugarContent: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dietLabels: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING(1480),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(355),
      allowNull: false
    },
    instructionUrl: {
      type: DataTypes.STRING(160),
      allowNull: false
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'foods',
    timestamps: true,
  });
  return Food;
};

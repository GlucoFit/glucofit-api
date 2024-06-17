'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Favorite.belongsTo(models.Food, { foreignKey: 'foodId', as: 'food' });
    }
  }
  Favorite.init({
    isFavorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'foods', // Table name for the Food model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Table name for the User model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
  });
  return Favorite;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Token, { foreignKey: 'userId', as: 'tokens'})
      User.hasMany(models.Scan, { foreignKey:'userId', as: 'scans' })
      User.hasOne(models.Assessment, { foreignKey: 'userId', as: 'assessments' });
      User.hasMany(models.Search, {foreignKey: 'userId', as: 'searches' });  
      User.hasMany(models.Favorite, {foreignKey: 'userId', as: 'favorites'});
    }
  }
  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null for users authenticated with Google
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });
  return User;
};

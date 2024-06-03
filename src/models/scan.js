'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Scan.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
    }
  }
  Scan.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    objectImageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    objectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    objectSugar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Scan',
    tableName: 'scans',
    timestamps: true
  });
  return Scan;
};
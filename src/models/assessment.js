'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    static associate(models) {
      // Association to Question
      Assessment.hasMany(models.Question, { 
        foreignKey: 'assessmentId', 
        as: 'questions' 
      });

      // Association to User
      Assessment.belongsTo(models.User, { 
        foreignKey: 'userId', 
        as: 'user' 
      });
    }
  }

  Assessment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Assessment',
    tableName: 'assessments',
    timestamps: true,
  });

  return Assessment;
};

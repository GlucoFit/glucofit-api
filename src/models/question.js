'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // define association here
      Question.belongsTo(models.Assessment, { foreignKey: 'assessmentId', as: 'assessment' });
    }
  }
  Question.init({
    questionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assessments', // ensure correct model name
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true,
  });

  return Question;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  Assessment.associate = function(models) {
    // Association to Question
    Assessment.hasMany(models.Question, {
      foreignKey: 'assessmentId', // Corrected foreign key to match the Question model
      as: 'questions',
    });

    // Optionally, if there's a User model:
    // Association to User
    Assessment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Assessment;
};

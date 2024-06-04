module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question_answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assessment_assessment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Question.associate = function(models) {
      // Association ke Assessment
      Question.belongsTo(models.Assessment, {
        foreignKey: 'assessment_assessment_id',
        as: 'assessment'
      });
    };
  
    return Question;
  };
  
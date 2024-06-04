// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Assessment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Assessment.hasMany(models.Question, { foreignKey: 'assessmentId', as: 'questions' });
//     }
//   }
//   Assessment.init({
//     result: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Assessment',
//     tableName: 'assessments',
//   });
//   return Assessment;
// };

module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    // Kolom-kolom model Assessment
    assessment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // kolom lainnya
  });

  Assessment.associate = function(models) {
    // Association ke Question
    Assessment.hasMany(models.Question, {
      foreignKey: 'assessment_assessment_id',
      as: 'questions'
    });
  };

  return Assessment;
};

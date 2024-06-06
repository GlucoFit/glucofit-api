'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScanDataset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScanDataset.hasOne(models.Scan, { foreignKey:'datasetId', as: 'scan_dataset' })
    }
  }
  ScanDataset.init({
    name: DataTypes.STRING,
    sugar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ScanDataset',
    tableName: 'scan_datasets',
    timestamps: true
  });
  return ScanDataset;
};
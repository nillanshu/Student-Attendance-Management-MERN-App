'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblattendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblattendance.init({
    admissionNumber: DataTypes.STRING,
    classId: DataTypes.STRING,
    classArmId: DataTypes.STRING,
    sessionTermId: DataTypes.STRING,
    status: DataTypes.STRING,
    dateTimeTaken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblattendance',
  });
  return tblattendance;
};
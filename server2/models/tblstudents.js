'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblstudents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblstudents.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    admissionNumber: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNo: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    classArmId: DataTypes.INTEGER,
    tokens: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblstudents',
  });
  return tblstudents;
};
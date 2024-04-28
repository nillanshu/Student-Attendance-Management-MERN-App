'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblsubjteacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblsubjteacher.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
    tokens: DataTypes.STRING,
    classId: DataTypes.STRING,
    classArmId: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    subjId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblsubjteacher',
  });
  return tblsubjteacher;
};
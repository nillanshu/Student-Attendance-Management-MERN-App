'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblsubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblsubject.init({
    subjName: DataTypes.STRING,
    classId: DataTypes.STRING,
    classArmId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblsubject',
  });
  return tblsubject;
};
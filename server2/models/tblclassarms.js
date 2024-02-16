'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblclassarms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblclassarms.init({
    classId: DataTypes.STRING,
    classArmName: DataTypes.STRING,
    isAssigned: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblclassarms',
  });
  return tblclassarms;
};
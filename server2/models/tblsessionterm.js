'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblsessionterm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblsessionterm.init({
    sessionName: DataTypes.STRING,
    termId: DataTypes.STRING,
    isActive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tblsessionterm',
  });
  return tblsessionterm;
};
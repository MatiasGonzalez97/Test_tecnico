'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    dni: { 
      type: DataTypes.NUMBER,
      primaryKey: true 
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.NUMBER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    paranoid:true
  });
  return User;
};
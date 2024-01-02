'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User,{foreignKey:'userId'});
      models.User.hasMany(Address,{
        foreignKey:'userId',
        as : 'address',
        onDelete: 'cascade'
      });
    }
  }
  Address.init({
    street: DataTypes.STRING,
    street_number: DataTypes.STRING,
    city: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
    paranoid: true
  });
  return Address;
};
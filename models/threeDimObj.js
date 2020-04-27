'use strict';
module.exports = (sequelize, DataTypes) => {
  const ThreeDimObj = sequelize.define('ThreeDimObj', {
    name: DataTypes.STRING,
    uri: DataTypes.STRING,
    group: DataTypes.STRING,
  }, {});
  ThreeDimObj.associate = function(models) {
    ThreeDimObj.belongsTo(models.User);
    ThreeDimObj.hasOne(models.Marker);
  };
  return ThreeDimObj;
};

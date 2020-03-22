'use strict';
module.exports = (sequelize, DataTypes) => {
  const Marker = sequelize.define('Marker', {
    picUri: DataTypes.STRING,
    pattUri: DataTypes.STRING,
  }, {});
  Marker.associate = function(models) {
    Marker.belongsTo(models.ThreeDimObj);
  };
  return Marker;
};

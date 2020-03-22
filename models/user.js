
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.ThreeDimObj);
  };
  return User;
};

"use strict";
 

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
      	User.hasMany(models.UserLogin)
      }
    }
    // ,
    // hooks: {
    //   beforeCreate:function(user, options, next) {
    //     console.log(user.username);
    //     next();
    //   }
  // }
});

  

  return User;
};

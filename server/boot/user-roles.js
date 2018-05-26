'use strict';
var intialUsers = require('./seeds/intialUsers');

module.exports = function(server) {
  var User = server.models.user;
  var Role = server.models.Role;
  var RoleMapping = server.models.RoleMapping;

  var users = intialUsers.users;

  let roles = [{
    name: 'admin',
    description: 'Can doing anything'
  },
  {
    name: 'people',
    description: 'as a normal user'
  }]

  Role.findOne({
    where: {
      name: 'admin',
    },
  }).then(role => {
    if (!role) {
      //create the admin role
      Role.create(roles, function(err, roles) {
        if (err) {console.log(err);}
      });
    }
  });

  User.findOne({
    where: {
      email: users[0].email,
    }
  }).then(user => {
    if (!user) {
      User.create(users, function(err, roles) {
        if (err) {
          console.log('error when seeding user') 
        }
      }) 
    }
  })

  RoleMapping.belongsTo(User);
  User.hasMany(RoleMapping, {foreignKey: 'principalId'});
  Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});
};

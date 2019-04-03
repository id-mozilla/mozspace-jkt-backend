'use strict';
var intialUsers = require('./seeds/intialUsers');

module.exports = function (server) {
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
    }
  ]

  Role.findOne({
    where: {
      name: 'admin',
    },
  }).then(role => {
    if (!role) {
      // create the admin role
      Role.create(roles, function(err, roles) {
        if (err) throw err;

        // check if user already created
        User.findOne({
          where: {
            email: users[0].email,
          },
        }).then(user => {
          if (!user) {
            // create users
            User.create(users, function(err, usersCreated) {
              if (err) throw err;

              // assign role to each user
              roles.map((role, idx) => {
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: usersCreated[idx].id,
                }, function(err, principal) {
                  if (err) throw err;

                  console.log('Created principal:', principal);
                });
              });
            });
          }
        });
      });
    }
  });

  RoleMapping.belongsTo(User);
  User.hasMany(RoleMapping, {
    foreignKey: 'principalId'
  });
  Role.hasMany(User, {
    through: RoleMapping,
    foreignKey: 'roleId'
  });
};

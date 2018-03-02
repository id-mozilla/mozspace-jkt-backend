'use strict';

module.exports = function(server) {
  var User = server.models.user;
  var Role = server.models.Role;
  var RoleMapping = server.models.RoleMapping;

  var users = [
    {email: 'diky@dikyarga.com', password: 'secret'},
    {email: 'arga@dikyarga.com', password: 'secret'}
  ];

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

  RoleMapping.belongsTo(User);
  User.hasMany(RoleMapping, {foreignKey: 'principalId'});
  Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});
};

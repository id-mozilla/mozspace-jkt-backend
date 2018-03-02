'use strict';

module.exports = function(User) {

  // Remove existing validations for email
  delete User.validations.email;

  // Adds email format validation
  // Note custom validator because validatesFormat with regex will return false on a null value
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  User.validate('email', function (err) { if (!re.test(this.email) && this.email !== undefined) err(); }, {message: 'Email format is invalid'});

  // Adds email uniqueness validation
  User.validatesUniquenessOf('email', {message: 'Email already exists'});

  User.getAllUserBasedOnRole = function (roleName, cb) {
    let app = User.app;
    let Role = app.models.Role
    let RoleMapping = app.models.RoleMapping
    let Profile = app.models.Profile;

    Role.findOne({
      where: {
        name: roleName
      },
      include: 'users'
    }).then(role => {
      console.log('detail role : ', role);
      cb(null, role)
    }).catch(err => {
      console.log('err when trying to get role ', err);
    })
  }

  User.remoteMethod('getAllUserBasedOnRole', {
    http: {
      path: '/all-user-based-on-role',
      verb: 'get',
    },
    accepts: {
      arg: 'roleName',
      type: 'string',
    },
    returns: {
      arg: 'users',
      type: 'array',
    },
    description: 'Get all users based on role',
  })

  User.isAlreadyRegistered = function(email, cb) {
    User.findOne({
      where: {
        email: email,
      },
      include: "profile",
    }, function(err, user) {
      if (err) cb(err);
      cb(null, user);
    })
  }

  User.remoteMethod('isAlreadyRegistered', {
    http: {
      path: '/isAlreadyRegistered',
      verb: 'get',
    },
    accepts: {
      arg: 'email',
      type: 'string',
    },
    returns: {
      arg: 'userDetail',
      type: 'object',
    },
    description: "Check that user already registered by email ?",
  })

  User.customLogin = function (email, password, cb) {
    let response = {
      success: false,
      message: '',
    };

    User.login({
      email: email,
      password: password,
    }, 'user', (err, res) => {
      if (err) {
        response.message = 'email atau password salah : ' + err;
        console.log('Err : ', err);
        return cb(null, {}, null, response.success, response.message);
      }

      User.findById(res.userId, {
        include: ['profile', 'insuranceCompany'],
      }).then((userDetail) => {
        // add profile property even it empty
        let userDetailObj = JSON.parse(JSON.stringify(userDetail))
        if (!userDetailObj.profile) {
          userDetailObj.profile = {}
        }
        response.message = 'sukses masuk kedalam sistem';
        response.success = true;
        cb(null, userDetailObj, res.id, response.success, response.message);
      })
    })
  }

  User.remoteMethod('customLogin', {
    http: {
      path: '/custom-login',
      verb: 'POST'
    },
    accepts: [
      {
        arg: 'email',
        type: 'string'
      },
      {
        arg: 'password',
        type: 'string'
      }
    ],
    returns: [
      {
        arg: 'userDetail',
        type: 'object'
      },
      {
        arg: 'token',
        type: 'string'
      },
      {
        arg: 'success',
        type: 'boolean',
      },
      {
        arg: 'message',
        type: 'string',
      },
    ],
    description: "Custom response after login - include profile"
  })

  User.register = function(email, password, cb) {
    let response = {
      success: false,
      message: 'something when wrong',
    };
    
    User.create({
      email: email,
      password: password,
    }).then((user) => {

      let app = User.app;
      let Role = app.models.Role;
      let RoleMapping = app.models.RoleMapping;
      let Profile = app.models.Profile;

      Role.findOne({
        where: {
          name: 'people',
        }
      }).then((role) => {
        if (!role) {
          response.message = 'role user tidak ditemukan';
          return cb(null, {}, null, response.success, response.message);
        }

        RoleMapping.create({
          principalType: "USER",
          principalId: user.id,
          roleId: role.id
        }).then(roleMapped => {
          console.log('sukses mapping user to people');
          User.login({
            email: email,
            password: password,
          }, 'user', (err, res) => {
            if (err) {
              console.log('Err : ', err);
              response.message = 'error when trying to login the user';
              return cb(null, {}, null, response.success, response.message);
            }

            Profile.create({
              name: 'Nama',
              userId: res.userId,
              phone: 'ponsel',
              location: {
                lng: 0,
                lat: 0,
              },
            }).then((profileCreated) => {
              
              User.findById(res.userId, {
                include: ['profile'],
              }).then((userDetail) => {

                let userDetailObj = JSON.parse(JSON.stringify(userDetail))
                console.log('user detail ', userDetailObj)
                response.success = true;
                response.message = 'sukses mendaftar';

                return cb(null, userDetailObj, res.id, response.success, response.message);
              }).catch(err => {
                console.log('error when try to get user detail : ', err);
                response.message = 'error when try to get user detail - final';
                
                return cb(null, {}, null, response.success, response.message);
              })
            }).catch(err => {
              response.message = 'create profile failed : ' + err;
              return cb(null, {}, null, response.success, response.message);
            });
          })
        }).catch(err => {
          console.log('error when trying to mapping the role :::::', err);
          return cb(null, {}, null, response.success, response.message);
        })
      }).catch(err => {
        console.log('err when find user : ', err);
        return cb(null, {}, null, response.success, response.message);
      })
    }).catch(err => {
      console.log('error buat akun : ', err);
      response.message = 'error saat buat akun';
      return cb(null, {}, null, response.success, response.message);
    })
  }
    
  User.remoteMethod('register', {
    http: {
      path: '/register',
      verb: 'post'
    },
    accepts: [
      {
        arg: 'email',
        type: 'string'
      },
      {
        arg: 'password',
        type: 'string'
      },
    ],
    returns: [
      {
        arg: 'userDetail',
        type: 'object'
      },
      {
        arg: "token",
        type: 'string'
      },
      {
        arg: 'success',
        type: 'boolean'
      },
      {
        arg: 'message',
        type: 'string'
      },
    ],
    description: "custom register for mobile app"
  })

  User.greet = function(msg, cb) {
    cb(null, 'Greetings... ' + msg);
  }

  User.remoteMethod('greet', {
    http: {
      path: '/greet',
      verb: 'get'
    },
    accepts: {arg: 'msg', type: 'string'},
    returns: {arg: 'greeting', type: 'string'},
    description: "Just trying to create remoteMethod"
  })

};

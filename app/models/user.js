var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Promise = require('bluebird');

db.Users.pre('save', function() {
  var user = this;
  
  var cipher = Promise.promisify(bcrypt.hash);

  return cipher(user.password, null, null).bind(this)
    .then(function(hash) {
      user.password = hash;
    })
    .catch(function(err) {
      console.log(err);
    });

});

db.Users.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(null, isMatch);
  });
};

var User = mongoose.model('User', db.Users);


module.exports = User;



// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;

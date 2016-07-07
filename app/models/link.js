var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Urls = mongoose.Schema({
  url: String, 
  baseUrl: String, 
  code: String, 
  title: String, 
  visits: Number, 
  createdAt: Date
});

Urls.pre('save', function() {

  var postedUrl = this;

  var shasum = crypto.createHash('sha1');
  shasum.update(postedUrl.url);
  postedUrl.code = shasum.digest('hex').slice(0, 5);

});

var Link = mongoose.model('Link', Urls);


module.exports = Link;



// [OLD MYSQL CODE]
//
// var db = require('../config');
// var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// module.exports = Link;

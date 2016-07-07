var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017', function(err, db) {
  if (err) {
    console.log('mongo connection err', err);  
  } else {
    console.log('Successfully connected to mongo db!!!');  
  }
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'We are in here!'));

db.Urls = new Schema({
  url: String, 
  baseUrl: String, 
  code: String, 
  title: String, 
  visits: Number, 
  createdAt: Date
});

db.Users = new Schema({
  username: String, 
  password: String, 
  createdAt: Date
});



module.exports = db;


// var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       k.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;

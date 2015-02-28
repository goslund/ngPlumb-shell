var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var config = require('./config/config');

var app = express();
var db = require('./app/models/');
var sequelize_fixtures = require('sequelize-fixtures');

db.sequelize.sync();

var fixtures = [{
  model: "User",
  data: {
    username: "geoff",
    password: "mdl2ep0c!"
  }
}]

sequelize_fixtures.loadFixtures(fixtures, db).then(function() {});


var http = http.Server(app);
var io = require('socket.io')(http);
app.io = io;

require('./config/express')(app, config);
// console.log(server.set());


var router = express.Router();
// app.http().io();
io.on('connection', function(socket) {
  socket.on("routes", function(req) {
    var router = express.Router();
    console.log(router.stack);
    console.log(req);
  })

});



http.listen(config.port);
// //   config = require('./config/config'),
// //   db = require('./app/models');



// // app.http().io();
// // 

// io.sockets.on('connection', function(socket) {
//   app.io.use('get', function (req, next) {
//     console.log(req.data);
//     if (!req.data) {
//      req.respond(':-(');
//     } else {
//      next();
//     }
//   });
//   console.log('connection');
//     socket.on('get', function(req, cb) {
//      console.log(req); 

//       // cb({"sailsResponseObject":"test"});

//     });
// });



// // db.sequelize
// //   .sync()
// //   .then(function () {
// //     http.listen(config.port);
// //     // io.listen(config.port);
// //     // SocketServer.listen(http);
// //   }).catch(function (e) {
// //     throw new Error(e);
// //   });


// define all your models before the configure block
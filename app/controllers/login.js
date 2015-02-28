var express = require('express'),
  db = require('../models');
var request = require('request');
var router = express.Router();
var passport = require('passport');
var db = require('../models');
module.exports = function (app) {
	
  // app.get('/login',
  // passport.authenticate('local-login'),
  // function(req, res) {

  // 	console.log("here");
  //   // If this function gets called, authentication was successful.
  //   // `req.user` contains the authenticated user.
  //   res.redirect('/users/' + req.user.username);
  // });

	app.post('/test', function(req, res) {
		console.log(req.body);
		res.json({status: "sucess"});
	});

  app.io.on('connection', function(socket) {
  	socket.on('home', function(data) {
  		var data = getIndexData();
  		socket.emit("home", data);
  	})
  })

  // app.io.route('home', function(req) {
  // 	var data = "hello world"; //your data;
  // 	console.log(req.data);
  // 	app.io.respond({data: data});
  // });
};


// router.get('/', function (req, res, next) {
// 	console.log(req.isSocket);
//   	db.User.findAll().done(function (users) {
//   		console.log("Here");
//     	var ret = res.render('index', {
//     		title: 'Generator-Express MVC',
//     		users: users
//   		});

//   		return ret;
// 	});
// });



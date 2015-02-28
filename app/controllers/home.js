var express = require('express'),
  db = require('../models');
var request = require('request');
var router = express.Router();
var passport = require('passport');

module.exports = function (app) {
	var getIndexData = function() {
		db.User.findAll().done(function(users) {
			return users;
		});
	}
 	
	app.get('/', function( req, res) {
		res.render('index', {
			title: "hw"
		})
	})
 //  app.get('/', function( req, res ) {
	// if (!req.xhr) {
	// 	res.render('index', {
	// 		title: "Hello World"
	// 	});
	// } else {
	// 	res.partial('index', {
	// 		title: "hello WorLd"
	// 	})
	// }

  	
 //  });

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



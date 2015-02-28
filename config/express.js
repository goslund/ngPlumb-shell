var express = require('express');
var glob = require('glob');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var passport = require('passport');
var restify = require('restify');
var epilogue = require('epilogue');
var db = require('../app/models/');
var LocalStrategy = require('passport-local').Strategy;

// var asset = require('express_asset_manger.js');
module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');
  app.set('layout','base_layout');
  app.use(expressLayouts);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 


  var server = restify.createServer();
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  
  

  epilogue.initialize({
    app: app,
    sequelize: db
  })

  var api_users = epilogue.resource({
    model: db.User,
    endpoints: ['/api/Users', '/users/:id']
  })

  server.listen();
  var passport_config = require('./passport')(passport);
  var User = require('../app/models/User');
  
  var assets = {
      "app.js": {
        type: "js",
        dir: "/",
        main: "app.js",
        files: [
          'lib/socket.io-client/socket.io.js',
          // 'lib/sails.io.js/sails.io.js',
          'lib/jquery/dist/jquery.min.js',
          'lib/angular/angular.min.js',
          'lib/angular-bootstrap/ui-bootstrap.min.js',
          'lib/angular-route/angular-route.min.js',
          'lib/angular-resource/angular-resource.min.js',
          'js/app.js',
          'js/route-controllers/*.js',
          'js/**/*.js'
        ],
        lib: "../lib/require.js"
      },
      "style.css": {
        type: "css",
        dir: "/lib",
        files: [
          'bootstrap-css/css/bootstrap.min.css',
          'bootstrap-css/css/bootstrap-theme.min.css'
        ]
      }
      // "app.js" : {
      //     type: "js",
      //     dir: "js",
      //     files: [
      //       '/public/lib/jquery/src/jquery.js'
      //     ]
      // },
      // "style.css" : {
      //     type: "less",
      //     dir: "less",
      //     main: "style.less",
      //     lib: "../lib/less.js"
      // }
  };

  var assetManagerConfig = {
      rootRoute   : "/public",
      srcDir      : "./public",
      buildDir    : "./builtAssets",
      process     : "true"
  };

  app.use(require("express-asset-manager")(assets, assetManagerConfig));
  app.use(express.static('/static', './builtAssets'));


  
  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  console.log();

  glob.sync(config.root + '/app/controllers/*.js').forEach(function(controller) {
    require(controller)(app);
  });
  
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};

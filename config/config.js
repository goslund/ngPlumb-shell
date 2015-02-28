var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'framework-app'
    },
    port: 3000,
    db: 'mysql://ngPlumb:ngplumbpw!@localhost/ngPlumb'
  },

  test: {
    root: rootPath,
    app: {
      name: '012-generator-express'
    },
    port: 3000,
    db: 'mysql://localhost/012-generator-express-test'
  },

  production: {
    root: rootPath,
    app: {
      name: '012-generator-express'
    },
    port: 3000,
    db: 'mysql://localhost/012-generator-express-production'
  }
};

module.exports = config[env];

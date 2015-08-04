/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

var environment = app.get('env');
var port = config.port;

switch (environment){
  case 'production':
    console.log('** PRODUCTION ON AZURE **');
    break;
  default:
    console.log('** DEV **');
    break;
}

// Start server
server.listen(port, config.ip, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + environment +
    '\n__dirname = ' + __dirname  +
    '\nprocess.cwd = ' + process.cwd());
  //console.log('Express server listening on %d, in %s mode', config.port, environment);
});

// Expose app
exports = module.exports = app;

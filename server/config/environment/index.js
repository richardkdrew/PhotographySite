'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'photo-site-secret-CeZZvHzKn8pfS7f5jwuYLFJ4MCdiHi0dCavZYnhkfAZj7qDnSGcfqJKsx1vl'
  }

  /*Flickr: {
    apiConfig: {
      qs: {
        authenticated: true,
        tag_mode: "all",
        format: "json",
        extras: "url_m,tags",
        nojsoncallback: 1
      }
    },
    defaults: {
      offset: 0,
      limit: 20
    }
  }*/

};

// Ensure that the necessary Environment variables are set

requiredProcessEnv('API_KEY');
requiredProcessEnv('SECRET');
requiredProcessEnv('ACCESS_TOKEN');
requiredProcessEnv('ACCESS_TOKEN_SECRET');
requiredProcessEnv('DEFAULT_TAGS');
requiredProcessEnv('USER_ID');


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

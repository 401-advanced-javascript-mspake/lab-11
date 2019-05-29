'use strict';
/**
 * Authentication Middleware Module
 * @module src/auth/middleware
 * @param {*} req Express HTTP Request object
 * @param {*} res Express HTTP Response object
 * @param {*} res Express next middleware function
 */

const User = require('./users-model.js');

module.exports = (req, res, next) => {

  try {
    let [authType, encodedString] = req.headers.authorization.split(/\s+/);
    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    switch(authType.toLowerCase()) {
    case 'basic':
      return _authBasic(encodedString);
    default:
      return _authError();
    }

  } catch(e) {
    return _authError();
  }

  /**
   * @function '_authBasic'
   * Function to perform basic authentication
   * @param {string} authString base64 encoded string in the format
   * 'username:password'
   * @returns {object} An authenticated user
   */
  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
    let auth = {username,password};  // {username:"john", password:"mysecret"}
    return User.authenticateBasic(auth)
      .then( user => _authenticate(user) );
  }

  /**
   * @function '_authenticate'
   * Function to generate an authentication token, attach it to the request
   * object, attach the authenticated user to the request, and send the
   * request and response to the front-end
   * @param {object} user A user to which an authentication token will be
   * attached
   */
  function _authenticate(user) {
    if ( user ) {
      req.user = user;
      req.token = user.generateToken();
      return next();
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};


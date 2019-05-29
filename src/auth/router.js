'use strict';

/**
 * Authentication Routes Module
 * 
 * @module src/auth/router
 */

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');

/**
 * @callback '/signup'
 * Signs up with basic auth. Sets response.headers.token and sets an 
 * 'auth' cookie
 * 
 * @param {object} req Express HTTP Request object
 * @param {object} res Express HTTP Response object
 * @param {function} next Express middleware next() function
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

/**
 * @callback '/signin'
 * Signs in with a username/password combo. Must exist in the database
 * 
 * @param {object} req Express HTTP Request object
 * @param {object} res Express HTTP Response object
 * @param {function} next Express middleware next() function
 */
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;

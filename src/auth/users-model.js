'use strict';

/**
 * Users Schema/Model Module
 * @module src/auth/users-model
 * 
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, required:true, default:'user', enum:['admin','editor','user'] },
});

users.pre('save', function(next) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch( error => {throw error;} );
});

/**
 * @function 'authenticateBasic'
 * Static method on the Users mongoose model
 * @param {object} auth Object containing username and password to check
 * @returns {object} user Object representing an authenticated user
 * 
 * @example
 * .authenticateBasic({username:'foo', password:'bar'});
 */
users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

// Compare a plain text password against the hashed one we have saved
/**
 * @function 'comparePassword'
 * Instance method which compares a given password against the hash saved to
 * the instance
 * @param {string} password Password to compare against the hash stored in the
 * user
 * @returns {object} Returns the user itself
 */
users.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password).then( valid => valid ? this : null);
};

// Generate a JWT from the user id and a secret
/**
 * @function 'generateToken'
 * Instance method which generates a user token to verify authentication
 * @returns {string} The generated token
 */
users.methods.generateToken = function() {
  let tokenData = {
    id:this._id,
    capabilities: (this.acl && this.acl.capabilities) || [],
  };
  return jwt.sign(tokenData, process.env.SECRET || 'changeit' );
};

module.exports = mongoose.model('users', users);

'use strict';

/**
 * Error Module
 * @module src/middleware/error
 * 
 * @param {object} err Express error object
 * @param {object} req Express HTTP Request object
 * @param {object} res Express HTTP Response object
 * @param {function} next Express middleware next() function
 */

module.exports = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

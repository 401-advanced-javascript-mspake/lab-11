'use strict';

/**
 * 404 Resource Not Found Module
 * @module src/middleware/404
 * 
 * @param {object} req Express HTTP Request object
 * @param {object} res Express HTTP Response object
 * @param {function} next Express middleware next() function
 */

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
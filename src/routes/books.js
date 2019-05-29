'use strict';
/**
 * Book Routes Module
 * @module src/routes/books
 * 
 */

const express = require('express');
const router = express.Router();
const auth = require('../auth/middleware.js');

router.get('/books', auth, handleGetAll);
router.get('/books/:id', auth, handleGetOne);

// Route Handlers
/**
 * Returns an array of all book objects to the front-end
 * @param {*} req Express HTTP Request object
 * @param {*} res Express HTTP Response object
 * @param {*} res Express next middleware function
 */
function handleGetAll(req, res, next) {
  let books = {
    count: 3,
    results: [
      { title:'Moby Dick' },
      { title:'Little Women' },
      { title: 'Eloquent Javascript' },
    ],
  };
  res.status(200).json(books);
}

/**
 * Returns one book object to the front-end
 * @param {*} req Express HTTP Request object
 * @param {*} res Express HTTP Response object
 * @param {*} res Express next middleware function
 */
function handleGetOne(req, res, next) {
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

module.exports = router;

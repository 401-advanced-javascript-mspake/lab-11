'use strict';

process.env.STORAGE = 'mongo';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET || 'changeit');
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET || 'changeit');
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });

      describe('Book routes', () => {
        it('/books route returns books when given valid username and password', () => {
          return mockRequest.get('/books')
            .auth(users[userType].username, users[userType].password)
            .then(results => {
              expect(results.status).toEqual(200);
              expect(results.body.results[0].title).toBeDefined();
            });
        });

        it('/books route returns an error when give invalid credentials', () => {
          return mockRequest.get('/books')
            .auth('alice', 'whiterabbit')
            .then(results => {
              expect(results.body.results).not.toBeDefined();
              expect(results.body.error).toBeDefined();
              expect(results.status).toBe(401);
            });
        });

        it('/books/:id route returns single book when given valid username and password', () => {
          return mockRequest.get('/books/1')
            .auth(users[userType].username, users[userType].password)
            .then(results => {
              expect(results.status).toEqual(200);
              expect(results.body.title).toEqual('Moby Dick');
            });
        });
        
        it('/books/:id route returns an error when given no or invalid credentials', () => {
          return mockRequest.get('/books/1')
            .then(results => {
              expect(results.body.title).toBeUndefined();
              expect(results.status).toEqual(401);
              expect(results.body.error).toBeDefined();
            });
        });
      });

    });
    
  });
  
});


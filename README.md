![CF](http://i.imgur.com/7v5ASc8.png) LAB  
=================================================  
  
## Lab 11  
  
### Authors: Morgana Spake, Jesse Von Volkinberg  
  
### Links and Resources  
* [submission PR](https://github.com/401-advanced-javascript-mspake/lab-11/pull/1)  
* [travis](https://www.travis-ci.com/)  
  
#### Documentation  
* jsdoc - '/' endpoint on server, requires a local filepath to the docs folder in the .env (see env requirements below)  
  
### Modules  
#### `app.js, books.js, middleware.js, router.js, users-model.js, 404.js, error.js`
##### Exported Values and Methods

###### `app -> express server`  
###### `book -> express Router instance`  
###### `middleware -> authentication middleware`  
###### `router -> express Router instance`  
###### `users-model -> mongoose model`  
###### `404 -> route not found middleware`  
###### `error -> error handler middleware`  
  
### Setup  
#### `.env` requirements  
* `PORT` - Port Number  
* `MONGODB_URI` - URL to the running mongo instance/db  
* `DOCS_FILEPATH` - Local filepath to docs folder  
   
#### Running the app  
* `npm start`  
Endpoints:  
* `/` - Docs  
* `/signup`  
* `/signin`  
* `/books`  
* `/books/:id`  
   
#### Tests  
* How do you run tests? `npm run test`  
* What assertions were made?  
  -Can create a user  
  -Can sign in with a valid username and password  
  -Cannot sign in with an invalid username/password  
  -Can access /books and /books/:id with a valid username/password  
  -Cannot access /books or /books/:id with an invalid username/password  
  
#### UML  
![uml](https://github.com/401-advanced-javascript-mspake/lab-11/blob/authentication/assets/uml.jpg)  
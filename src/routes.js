const express = require('express');

const UserController = require('./controller/Users/UserController');
const SessionController = require('./controller/Users/SessionController');
const DreamListController = require('./controller/Travels/DreamListController');

const routes = express.Router();

// Importing the authentication middleware and putting it on the authMiddleware variable
const authMiddleware = require('./middlewares/authMiddleware');

// Defining the only two routes that don't need authentication: Register and Login
routes.post('/registrate', UserController.create);
routes.post('/login', SessionController.create);

// Using the authMiddleware for all the routes that will come before this line
routes.use(authMiddleware);

// Routes relative to DreamList function in the application
routes.post('/dreamlist', DreamListController.create);
routes.get('/dreamlist', DreamListController.index);
routes.get('/dreamlist/:id', DreamListController.show);
routes.delete('dreamlist/:id', DreamListController.destroy);

module.exports = routes;

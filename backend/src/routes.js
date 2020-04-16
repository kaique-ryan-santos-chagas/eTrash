const express = require('express');
const routes = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const SessionController = require('./controllers/SessionController');


routes.get('/users', UserController.index);
routes.post('/users/create', UserController.create);
routes.delete('/users/delete', UserController.delete);
routes.post('/session', SessionController.create);


module.exports = routes;
const express = require('express');
const routes = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const SessionController = require('./controllers/SessionController');
const SessionCompaniesController = require('./controllers/SessionCompaniesController')

routes.get('/users', UserController.index);
routes.post('/users/create', UserController.create);
routes.delete('/users/delete', UserController.delete);

routes.post('/session', SessionController.create);
routes.post('/session/companies', SessionController.create);

routes.post('/companies/create',CompaniesController.create);
routes.get('/companies',CompaniesController.index);
routes.delete('/companies/delete',CompaniesController.delete);

routes.post('/point/create',PointController.create);
routes.get('/point',PointController.index);
routes.delete('/point/delete',PointController.delete);

module.exports = routes;
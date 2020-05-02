const express = require('express');
const routes = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const SessionController = require('./controllers/SessionController');
const DiscartController = require('./controllers/DiscartController');

routes.get('/users', UserController.index);
routes.post('/users/create', UserController.create);
routes.delete('/users/delete', UserController.delete);

routes.post('/session', SessionController.userCreate);
routes.post('/session/companies', SessionController.companyCreate);
routes.post('/session/point', SessionController.pointCreate);

routes.post('/companies/create',CompaniesController.create);
routes.get('/companies',CompaniesController.index);
routes.delete('/companies/delete',CompaniesController.delete);

routes.post('/point/create',PointController.create);
routes.get('/point',PointController.index);
routes.delete('/point/delete',PointController.delete);


routes.post('/discarts/user', DiscartController.userCreate);
routes.post('/discarts/company', DiscartController.companyCreate);
routes.post('/discarts/point', DiscartController.pointCreate);
routes.get('/discarts/points', DiscartController.searchPointForUser);

module.exports = routes;
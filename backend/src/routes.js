const express = require('express');
const morgan = require('morgan');
const routes = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const SessionController = require('./controllers/SessionController');

routes.use(morgan('dev'));

routes.post('/users/create', UserController.create);

routes.post('/session', SessionController.userCreate);

routes.post('/session/companies', SessionController.companyCreate);

routes.post('/session/point', SessionController.pointCreate);

routes.post('/companies/create',CompaniesController.create);

routes.post('/point/create',PointController.create);


module.exports = routes;
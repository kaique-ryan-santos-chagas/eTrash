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

routes.post('/users/password/recovery',UserController.recovery);

routes.put('/users/password/reset',UserController.reset);

routes.post('/companies/create',CompaniesController.create);

routes.post('/session/companies', SessionController.companyCreate);

routes.post('/companies/password/recovery',CompaniesController.recovery);

routes.put('/companies/password/reset',CompaniesController.reset);

routes.post('/point/create',PointController.create);

routes.post('/session/point', SessionController.pointCreate);

routes.post('/point/password/recovery',PointController.recovery);

routes.put('/point/password/reset',PointController.reset);



module.exports = routes;
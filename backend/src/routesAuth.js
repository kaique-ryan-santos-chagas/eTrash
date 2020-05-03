const express = require('express');
const routesAuth = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const DiscartController = require('./controllers/DiscartController');
const authMiddleware = require('./middlewares/auth');

routesAuth.use(authMiddleware);

routesAuth.get('/users', UserController.index);
routesAuth.delete('/users/delete', UserController.delete);

routesAuth.get('/companies',CompaniesController.index);
routesAuth.delete('/companies/delete',CompaniesController.delete);

routesAuth.get('/point',PointController.index);
routesAuth.delete('/point/delete',PointController.delete);

routesAuth.post('/discarts/user', DiscartController.userCreate);
routesAuth.post('/discarts/company', DiscartController.companyCreate);
routesAuth.post('/discarts/point', DiscartController.pointCreate);
routesAuth.get('/discarts/points', DiscartController.searchPointForUser);

module.exports = routesAuth;
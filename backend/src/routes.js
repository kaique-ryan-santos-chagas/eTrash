const express = require('express');
const teste = require('./controllers/teste');
const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/',teste.ola);

module.exports = routes;
const express = require('express');
const routes = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const UserController = require('./controllers/UserController');
const PointController = require('./controllers/PointController');
const SessionController = require('./controllers/SessionController');


routes.get('/',);


module.exports = routes;
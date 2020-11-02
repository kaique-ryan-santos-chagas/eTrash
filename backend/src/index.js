const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const routesAuth = require('./routesAuth');
const morgan = require('morgan');
const http = require('http');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(cors());
app.use(routes);
app.use(routesAuth);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.listen(process.env.PORT || 3001);



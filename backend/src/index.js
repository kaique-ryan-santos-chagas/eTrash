const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const routesAuth = require('./routesAuth');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(routesAuth);
app.listen(process.env.PORT || 3001);



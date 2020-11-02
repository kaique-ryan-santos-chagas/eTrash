const knex = require('knex');
const knexConfig = require('../../knexfile.js');

const connection = knex(knexConfig.development);

module.exports = connection;
const configuration = require('../../knexfile');
const knex = require('knex');

const connection = knex(configuration.development);

module.exports = connection;

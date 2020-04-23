const knex = require('knex');
const development = require('../knexfile').development;

module.exports = knex(development);

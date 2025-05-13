const knex = require('knex');

const config = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
console.log('[db/knex] building for environment: ', environment);

const selectedConfig = config[environment];

const Knex = knex(selectedConfig);

module.exports = Knex;

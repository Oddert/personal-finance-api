const dayjs = require('dayjs');
const { types } = require('pg');
const { builtins } = require('pg-types');

const parseFn = (val) => {
    return val === null ? null : dayjs(val).format('YYYY-MM-DD HH:mm:ss');
};

types.setTypeParser(builtins.TIMESTAMPTZ, parseFn);
types.setTypeParser(builtins.TIMESTAMP, parseFn);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/db/personal-finance.dev.db3',
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    staging: {
        client: 'pg',
        connection: {
            user: 'postgres',
            password: 'mysecretpassword',
            database: 'mydatabase',
            host: 'host.docker.internal',
            port: 5433,
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/private-seeds',
        },
    },
    production: {
        client: 'pg',
        connection: {
            user: 'postgres',
            password: 'mysecretpassword',
            database: 'mydatabase',
            host: 'host.docker.internal',
            port: 5432,
        },
        pool: {
            min: 2,
            max: 10,
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/private-seeds',
        },
    },
};

module.exports = config;

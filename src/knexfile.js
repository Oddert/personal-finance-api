// const knex = require( 'knex' );
const dayjs = require('dayjs');
const { types } = require('pg');
const { builtins } = require ('pg-types');

const parseFn = (val) => {
  return val === null ? null : dayjs(val).format('YYYY-MM-DD HH:mm:ss');
};

types.setTypeParser(builtins.TIMESTAMPTZ, parseFn);
types.setTypeParser(builtins.TIMESTAMP, parseFn);

// knex.on('query', (queryData) => {
//     console.log(queryData);
// });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
    // development: {
    //     client: 'pg',
    //     connection: {
    //         user: 'postgres',
    //         password: 'examplepassword',
    //         database: 'mydatabase',
    //         host: 'host.docker.internal',
    //         port: 5432,
    //         // host: '127.0.0.1',
    //         // charset: 'utf8mb4',
    //         // timezone: 'bst',
    //         // typeCast: (field, next) => {
    //         //     console.log(field.type)
    //         //     if (field.type === 'DATE') {
    //         //         console.log(field)
    //         //         return field.string();
    //         //     }
    //         //     return next();
    //         // },
    //     },
    //     useNullAsDefault: true,
    //     migrations: {
    //         directory: __dirname + '/db/migrations'
    //     },
    //     seeds: {
    //         directory: __dirname + '/db/seeds'
    //     }
    // },
    development: {
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/db/personal-finance.dev.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/private-seeds'
        }
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
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
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
            max: 10
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
}

module.exports = config

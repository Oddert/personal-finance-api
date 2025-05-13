/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const { getHashedPassword } = require('../../security/hash');

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes All existing entries
    await knex('user').delete();
    await knex('user').insert([
        {
            id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            created_on: new Date(),
            updated_on: new Date(),
            username: 'sample@example.com',
            password: getHashedPassword('Password1'),
            first_name: 'Example',
            last_name: 'User',
            languages: 'en-GB, en-US',
            default_lang: 'en-GB',
            currencies: 'GBP',
            default_currency: 'GBP',
        },
    ]);
};

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */

const { getHashedPassword } = require('../../security/hash')

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes Al existing entries
    await knex('user').delete()
    await knex('user').insert([
        {
            id: 1,
            created_on: new Date('2025-04-27T14:25:48.950Z'),
            updated_on: new Date('2025-04-27T14:25:48.950Z'),
            username: 'sample@example.com',
            password: getHashedPassword('Password1'),
            display_name: 'Example User',
            languages: 'en-GB, en-US',
            default_lang: 'en-GB',
            currencies: 'GBP',
            default_currency: 'GBP'
        }
    ])
}
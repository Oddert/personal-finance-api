const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes Al existing entries
    await knex('card').delete()
    await knex('card').insert([
        {
            id: 1,
            is_default: true,
            card_name: 'Main debit account.',
            card_type: 'DEBIT',
            bank_name: 'NatWest',
            sort_code: 278656,
            card_number: 2965738142,
            expires: new Date(dayjs().add(2, 'years').startOf('month')),
            description: '',
            icon: '',
            cover_image: '',
            created_on: new Date(),
            updated_on: new Date(),
        }
    ])
}
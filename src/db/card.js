
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('card').del()
    await knex('card').insert([
        {
            id: 1,
            is_default: true,
            card_name: 'Main debit account.',
            card_type: 'DEBIT',
            bank_name: 'Bank of Scotland',
            sort_code: 0,
            card_number: 0,
            expires: 1788217200000,
            description: '',
            icon: '',
            cover_image: '',
            created_on: new Date().getTime(),
            updated_on: new Date().getTime(),
        }
    ])
}
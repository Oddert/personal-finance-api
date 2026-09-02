/* eslint-disable no-undef */
/* eslint-disable quotes */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('card').insert([
        {
            id: 'be913800-df3b-4285-803a-88e971fde8f3',
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            is_default: true,
            card_name: 'Main Current Account',
            card_type: 'CURRENT',
            bank_name: 'Example Bank',
            description: 'Primary day-to-day spending account',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            is_default: false,
            card_name: 'Savings Account',
            card_type: 'SAVINGS',
            bank_name: 'Example Bank',
            description: 'Easy-access savings account',
            created_on: new Date(),
            updated_on: new Date(),
        },
    ]);
};

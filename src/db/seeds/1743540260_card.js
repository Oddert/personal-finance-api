const dayjs = require('dayjs');

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes All existing entries
    await knex('card').delete();
    await knex('card').insert([
        {
            id: 'be913800-df3b-4285-803a-88e971fde8f3',
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
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
        },
    ]);
};

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes All existing entries
    await knex('budget_row').delete();
    await knex('budget').delete();
    await knex('transaction').delete();
    await knex('category_matcher').delete();
    await knex('matcher').delete();
    await knex('category').delete();
    await knex('scheduler').delete();
    await knex('transactor').delete();
    await knex('scenario_card_bridge').delete();
    await knex('scenario').delete();
    await knex('card').delete();
    await knex('user').delete();
};

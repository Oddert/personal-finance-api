/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('transaction', (table) => {
        table.increments('id').primary();
        table.datetime('date');
        table.string('transaction_type', 5);
        table.string('description');
        table.float('debit');
        table.float('credit');
        table.float('ballance');
        table.datetime('created_on');
        table.datetime('updated_on');
        table.integer('category_id').references('category.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('transaction');
};

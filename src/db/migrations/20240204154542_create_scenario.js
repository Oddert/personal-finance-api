/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('scenario', (table) => {
        table.increments('id').primary();
        table.datetime('start_date').defaultTo(null);
        table.datetime('end_date').defaultTo(null);
        table.datetime('created_on').notNullable();
        table.datetime('updated_on').notNullable();
        table.string('title').notNullable().defaultTo('');
        table.string('description').notNullable().defaultTo('');
        table.integer('start_ballance').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('scenario');
};

/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('scheduler', (table) => {
        table.increments('id').primary();
        table.string('scheduler_code').notNullable();
        table.datetime('created_on');
        table.datetime('updated_on');
        table.integer('step').defaultTo(null);
        table.datetime('start_date').defaultTo(null);
        table.integer('day').defaultTo(null);
        table.integer('nth_day').defaultTo(null);
        table.integer('transactor_id').references('transactor.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('scheduler');
};

/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('scheduler', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid()).notNullable();
        table.string('scheduler_code').notNullable();
        table.datetime('created_on');
        table.datetime('updated_on');
        table.integer('step').defaultTo(null);
        table.datetime('start_date').defaultTo(null);
        table.integer('day').defaultTo(null);
        table.integer('nth_day').defaultTo(null);
        table.uuid('transactor_id').references('transactor.id').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('scheduler');
};

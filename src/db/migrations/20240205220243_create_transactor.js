/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('transactor', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid()).notNullable();
        table.datetime('created_on').notNullable();
        table.datetime('updated_on').notNullable();
        table.string('description').notNullable();
        table.boolean('is_addition').notNullable().defaultTo(false);
        table.float('value').notNullable().defaultTo(0);
        table.uuid('scenario_id').references('scenario.id').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('transactor');
};

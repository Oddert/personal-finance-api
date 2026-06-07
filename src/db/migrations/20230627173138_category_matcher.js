/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('category_matcher', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid()).notNullable();
        table
            .uuid('category_id')
            .references('id')
            .inTable('category')
            .notNullable();
        table
            .uuid('matcher_id')
            .references('id')
            .inTable('matcher')
            .notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('category_matcher');
};

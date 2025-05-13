/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('card', (table) => {
        table.increments('id').primary();
        table.boolean('is_default').notNullable().defaultTo(false);
        table.string('card_name').notNullable();
        table.string('card_type');
        table.string('bank_name').notNullable();
        table.integer('sort_code');
        table.integer('card_number');
        table.datetime('expires');
        table.string('description');
        table.string('icon');
        table.string('cover_image');
        table.datetime('created_on').notNullable();
        table.datetime('updated_on').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('card');
};

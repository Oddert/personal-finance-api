/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary()
        table.datetime('created_on').notNullable()
        table.datetime('updated_on').notNullable()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.string('display_name').notNullable()
        table.string('languages').notNullable()
        table.string('default_lang').notNullable()
        table.string('currencies').notNullable()
        table.string('default_currency').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user')
};

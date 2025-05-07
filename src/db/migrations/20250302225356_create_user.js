/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.uuid('id').defaultTo(knex.fn.uuid()).primary()
        table.date('created_on').notNullable()
        table.date('updated_on').notNullable()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
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

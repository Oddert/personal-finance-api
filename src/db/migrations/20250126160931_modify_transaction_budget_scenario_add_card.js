/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.alterTable('transaction', (table) => {
        table.integer('card_id').references('card.id')
    })
    knex.schema.alterTable('budget', (table) => {
        table.integer('card_id').references('card.id')
    })
    knex.schema.alterTable('scenario', (table) => {
        table.integer('card_id').references('card.id')
    })
    return
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.alterTable('transaction', (table) => {
        table.dropColumn('card_id')
    })
    knex.schema.alterTable('budget', (table) => {
        table.dropColumn('card_id')
    })
    knex.schema.alterTable('scenario', (table) => {
        table.dropColumn('card_id')
    })
    return
};

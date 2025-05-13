/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('budget', (table) => {
        table.dropColumn('card_id')
    }).then(() => knex.schema.alterTable('budget_row', (table) => {
        table.dropColumn('budget_id')
        table.dropColumn('category_id')
    })).then(() => knex.schema.alterTable('transaction', (table) => {
        table.dropColumn('category_id')
        table.dropColumn('card_id')
    })).then(() => knex.schema.alterTable('category_matcher', (table) => {
        table.dropColumn('category_id')
        table.dropColumn('matcher_id')
        table.uuid('id').primary().defaultTo(knex.fn.uuid()).notNullable()
    })).then(() => knex.schema.alterTable('scenario', (table) => {
        table.dropColumn('card_id')
    })).then(() => knex.schema.alterTable('transactor', (table) => {
        table.dropColumn('scenario_id')
    })).then(() => knex.schema.alterTable('scheduler', (table) => {
        table.dropColumn('transactor_id')
    }))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('budget', (table) => {
        table.increments('card_id').notNullable().references('card.id')
    }).then(() => knex.schema.alterTable('budget_row', (table) => {
        table.integer('budget_id').references('budget.id').notNullable()
        table.integer('category_id').references('category.id').notNullable()
    })).then(() => knex.schema.alterTable('transaction', (table) => {
        table.increments('category_id').notNullable().references('category.id')
        table.increments('card_id').notNullable().references('card.id')
    })).then(() => knex.schema.alterTable('category_matcher', (table) => {
        table.increments('category_id').notNullable().references('category.id')
        table.increments('matcher_id').notNullable().references('matcher.id')
        table.dropColumn('id')
    })).then(() => knex.schema.alterTable('scenario', (table) => {
        table.increments('card_id').notNullable().references('card.id')
    })).then(() => knex.schema.alterTable('transactor', (table) => {
        table.increments('scenario_id').notNullable().references('scenario.id')
    })).then(() => knex.schema.alterTable('scheduler', (table) => {
        table.increments('transactor_id').notNullable().references('transactor.id')
    }))
};

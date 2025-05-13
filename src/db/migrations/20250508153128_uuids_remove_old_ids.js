/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .alterTable('budget', (table) => {
            table.dropForeign('card_id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.dropForeign('budget_id');
                table.dropForeign('category_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table.dropForeign('category_id');
                table.dropForeign('card_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category_matcher', (table) => {
                table.dropForeign('category_id');
                table.dropForeign('matcher_id');
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.dropForeign('card_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transactor', (table) => {
                table.dropForeign('scenario_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scheduler', (table) => {
                table.dropForeign('transactor_id');
            }),
        );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .alterTable('budget', (table) => {
            table.foreign('card_id', 'card.id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.foreign('budget_id', 'budget.id');
                table.foreign('category_id', 'category.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table.foreign('category_id', 'category.id');
                table.foreign('card_id', 'card.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category_matcher', (table) => {
                table.foreign('category_id', 'category.id');
                table.foreign('matcher_id', 'matcher.id');
                table.increments('id').primary().notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.foreign('card_id', 'card.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transactor', (table) => {
                table.foreign('scenario_id', 'scenario.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scheduler', (table) => {
                table.foreign('transactor_id', 'transactor.id');
            }),
        );
};

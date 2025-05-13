/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .alterTable('budget', (table) => {
            table.uuid('card_id').notNullable().references('card.id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.uuid('budget_id').references('budget.id').notNullable();
                table
                    .uuid('category_id')
                    .references('category.id')
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table
                    .uuid('category_id')
                    .notNullable()
                    .references('category.id');
                table.uuid('card_id').notNullable().references('card.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category_matcher', (table) => {
                table
                    .uuid('category_id')
                    .notNullable()
                    .references('category.id');
                table.uuid('matcher_id').notNullable().references('matcher.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.uuid('card_id').notNullable().references('card.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transactor', (table) => {
                table
                    .uuid('scenario_id')
                    .notNullable()
                    .references('scenario.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scheduler', (table) => {
                table
                    .uuid('transactor_id')
                    .notNullable()
                    .references('transactor.id');
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
            table.dropColumn('card_id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.dropColumn('budget_id');
                table.dropColumn('category_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table.dropColumn('category_id');
                table.dropColumn('card_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category_matcher', (table) => {
                table.dropColumn('category_id');
                table.dropColumn('matcher_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.dropColumn('card_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transactor', (table) => {
                table.dropColumn('scenario_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scheduler', (table) => {
                table.dropColumn('transactor_id');
            }),
        );
};

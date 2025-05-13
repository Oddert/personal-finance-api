/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .alterTable('budget', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid()).notNullable();
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('card', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('user', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('category', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('matcher', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('transactor', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
            }),
        )
        .then(() =>
            knex.schema.alterTable('scheduler', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .defaultTo(knex.fn.uuid())
                    .notNullable();
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
            table.dropColumn('id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('card', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('user', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('matcher', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transactor', (table) => {
                table.dropColumn('id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scheduler', (table) => {
                table.dropColumn('id');
            }),
        );
};

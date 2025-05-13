/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .alterTable('budget', (table) => {
            table.uuid('user_id').notNullable().references('user.id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.uuid('user_id').notNullable().references('user.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('card', (table) => {
                table.uuid('user_id').notNullable().references('user.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category', (table) => {
                table.uuid('user_id').notNullable().references('user.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.uuid('user_id').notNullable().references('user.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table.uuid('user_id').notNullable().references('user.id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('matcher', (table) => {
                table.uuid('user_id').notNullable().references('user.id');
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
            table.dropColumn('user_id');
        })
        .then(() =>
            knex.schema.alterTable('budget_row', (table) => {
                table.dropColumn('user_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('card', (table) => {
                table.dropColumn('user_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('category', (table) => {
                table.dropColumn('user_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('scenario', (table) => {
                table.dropColumn('user_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('transaction', (table) => {
                table.dropColumn('user_id');
            }),
        )
        .then(() =>
            knex.schema.alterTable('matcher', (table) => {
                table.dropColumn('user_id');
            }),
        );
};

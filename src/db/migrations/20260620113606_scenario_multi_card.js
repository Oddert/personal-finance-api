/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('scenario_card_bridge', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid()).notNullable();
            table.uuid('scenario_id').references('scenario.id').notNullable();
            table.uuid('card_id').references('card.id').notNullable();
            table.datetime('calc_start_date').defaultTo(knex.fn.now());
            table.datetime('calc_end_date').defaultTo(null);
            table.datetime('display_start_date').defaultTo(knex.fn.now());
            table.datetime('display_end_date').defaultTo(null);
            table.float('start_balance').defaultTo(0);
            table.text('note');
        })
        .then(() => {
            return knex.schema.alterTable('scenario', (table) => {
                table.dropColumn('start_balance');
            });
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('scenario_card_bridge');
};

import { ColumnNameMappers, Model } from 'objection';

import knex from '../db/knex';
import { IClientBudgetRow } from '../types/clientTypes';

Model.knex(knex);

export default class BudgetRow extends Model {
    id?: string;

    static createdOn: Date | string;

    static updatedOn: Date | string;

    categoryId: string;

    colour: string;

    label: string;

    value: number;

    varHighPc: number;

    varLowPc: number;

    static get tableName() {
        return 'budget_row';
    }

    static beforeInsert() {
        const now = new Date().toISOString();
        this.createdOn = now;
        this.updatedOn = now;
    }

    static $beforeInsert() {
        const now = new Date().toISOString();
        this.createdOn = now;
        this.updatedOn = now;
    }

    static $afterFind() {
        this.createdOn = this.createdOn
            ? new Date(this.createdOn).toISOString()
            : '';
        this.updatedOn = this.updatedOn
            ? new Date(this.updatedOn).toISOString()
            : '';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'categoryId',
                'label',
                'colour',
                'value',
                'varLowPc',
                'varHighPc',
            ],
            properties: {
                id: { type: 'string' },
                userId: { type: 'string' },
                budgetId: { type: 'string' },
                colour: { type: 'string' },
                categoryId: { type: 'string' },
                label: { type: 'string', minLength: 3 },
                value: { type: 'number' },
                varLowPc: { type: 'number' },
                varHighPc: { type: 'number' },
            },
        };
    }

    static get relationMappings() {
        const Budget = __dirname + '/Budget';
        return {
            budget: {
                relation: Model.BelongsToOneRelation,
                modelClass: Budget,
                join: {
                    from: 'budget_row.budget_id',
                    to: 'budget.id',
                },
            },
        };
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                userId: obj.user_id,
                budgetId: obj.budget_id,
                categoryId: obj.category_id,
                colour: obj.colour,
                label: obj.label,
                value: obj.value,
                varLowPc: obj.var_low_pc,
                varHighPc: obj.var_high_pc,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                user_id: obj.userId,
                budget_id: obj.budgetId,
                category_id: obj.categoryId,
                colour: obj.colour,
                label: obj.label,
                value: obj.value,
                var_low_pc: obj.varLowPc,
                var_high_pc: obj.varHighPc,
            };
        },
    };
}

/**
 * Formats a budgetRow to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param budgetRow The budgetRow to return.
 * @returns The formatted budgetRow.
 */
export const reprBudgetRow = (budgetRow: BudgetRow) => {
    const formattedBudget: IClientBudgetRow = {
        categoryId: budgetRow.categoryId,
        colour: budgetRow.colour,
        id: budgetRow.id ?? '',
        label: budgetRow.label,
        value: budgetRow.value,
        varHighPc: budgetRow.varHighPc,
        varLowPc: budgetRow.varLowPc,
    };

    return formattedBudget;
};

/**
 * List format of {@link reprBudgetRow}.
 *
 * Formats a list of budgetRows to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param budgetRows List of budgetRows to represent.
 * @returns The formatted budgetRows.
 */
export const reprBudgetRowList = (budgetRows: BudgetRow[]) => {
    return budgetRows.map(reprBudgetRow);
};

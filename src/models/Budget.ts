import { ColumnNameMappers, Model } from 'objection';

import knex from '../db/knex';
import { IClientBudget } from '../types/clientTypes';
import { reprBudgetRowList } from './BudgetRow';

Model.knex(knex);

export default class Budget extends Model {
    id?: string;

    cardId: string;

    userId: string;

    name: string;

    shortDescription: string;

    longDescription: string;

    isDefault: boolean;

    createdOn: string;

    updatedOn: string;

    budgetRows: any[];

    static createdOn: Date | string;

    static updatedOn: Date | string;

    static get tableName() {
        return 'budget';
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
                'name',
                'shortDescription',
                'longDescription',
                'createdOn',
                'updatedOn',
            ],
            properties: {
                id: { type: 'string' },
                cardId: { type: 'string' },
                userId: { type: 'string' },
                name: { type: 'string', minLength: 3 },
                shortDescription: { type: 'string' },
                longDescription: { type: 'string' },
                isDefault: { type: 'boolean' },
                createdOn: { type: 'string' },
                updatedOn: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        const BudgetRow = __dirname + '/BudgetRow';
        return {
            budgetRows: {
                relation: Model.HasManyRelation,
                modelClass: BudgetRow,
                join: {
                    from: 'budget.id',
                    to: 'budget_row.budget_id',
                },
            },
        };
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                createdOn: obj.created_on,
                id: obj.id,
                cardId: obj.card_id,
                userId: obj.user_id,
                name: obj.name,
                shortDescription: obj.short_desc,
                longDescription: obj.long_desc,
                isDefault: obj.is_default,
                updatedOn: obj.updated_on,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                card_id: obj.cardId,
                user_id: obj.userId,
                name: obj.name,
                short_desc: obj.shortDescription,
                long_desc: obj.longDescription,
                is_default: obj.isDefault,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
            };
        },
    };
}

/**
 * Formats a budget to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param budget The budget to return.
 * @returns The formatted budget.
 */
export const reprBudget = (budget: Budget) => {
    const formattedBudget: IClientBudget = {
        budgetRows: [],
        cardId: budget.cardId,
        createdOn: budget.createdOn,
        id: budget.id ?? '',
        isDefault: Boolean(budget.isDefault),
        longDescription: budget.longDescription,
        name: budget.name,
        shortDescription: budget.shortDescription,
        updatedOn: budget.updatedOn,
    };

    if (budget.budgetRows) {
        formattedBudget.budgetRows = reprBudgetRowList(budget.budgetRows);
    }

    return formattedBudget;
};

/**
 * List format of {@link reprBudget}.
 *
 * Formats a list of budgets to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param budgets List of budgets to represent.
 * @returns The formatted budgets.
 */
export const reprBudgetList = (budgets: Budget[]) => {
    return budgets.map(reprBudget);
};

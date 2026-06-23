import { ColumnNameMappers, Model } from 'objection';

import knex from '../db/knex';
import { reprMatcherList } from './Matcher';
import type Matcher from './Matcher';
import { IClientCategory } from '../types/clientTypes';

Model.knex(knex);

export default class Category extends Model {
    id?: string;

    description?: string;

    colour?: string;

    label?: string;

    created_on: Date | string;

    updated_on: Date | string;

    static created_on: Date | string;

    static updated_on: Date | string;

    user_id: string;

    matchers: Matcher[];

    static get tableName() {
        return 'category';
    }

    static beforeInsert() {
        const now = new Date().toISOString();
        this.created_on = now;
        this.updated_on = now;
    }

    static afterFind() {
        this.created_on = this.created_on
            ? new Date(this.created_on).toISOString()
            : '';
        this.updated_on = this.updated_on
            ? new Date(this.updated_on).toISOString()
            : '';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['colour', 'label', 'created_on', 'updated_on'],
            properties: {
                id: { type: 'string' },
                description: { type: ['string', 'null'] },
                colour: { type: 'string', minLength: 3 },
                created_on: { type: 'string' },
                updated_on: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        const Transaction = __dirname + '/Transaction';
        const Matcher = __dirname + '/Matcher';
        return {
            transactions: {
                relation: Model.HasManyRelation,
                modelClass: Transaction,
                join: {
                    from: 'category.id',
                    to: 'transaction.category_id',
                },
            },
            matchers: {
                relation: Model.ManyToManyRelation,
                modelClass: Matcher,
                join: {
                    from: 'category.id',
                    through: {
                        from: 'category_matcher.category_id',
                        to: 'category_matcher.matcher_id',
                    },
                    to: 'matcher.id',
                },
            },
        };
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                label: obj.label,
                description: obj.description,
                colour: obj.colour,
                created_on: obj.created_on,
                updated_on: obj.updated_on,
                user_id: obj.user_id,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                label: obj.label,
                description: obj.description,
                colour: obj.colour,
                created_on: obj.created_on,
                updated_on: obj.updated_on,
                user_id: obj.user_id,
            };
        },
    };
}

/**
 * Formats a category to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param category The category to return.
 * @returns The formatted category.
 */
export const reprCategory = (category: Category) => {
    const formattedCategory: IClientCategory = {
        colour: category.colour ?? '#ECF0F1',
        createdOn: category.created_on
            ? new Date(category.created_on).toISOString()
            : '',
        description: category.description ?? null,
        id: category.id ?? '',
        label: category.label ?? '',
        matchers: [],
        updatedOn: category.updated_on
            ? new Date(category.updated_on).toISOString()
            : '',
        userId: category.user_id,
    };

    if (category.matchers) {
        formattedCategory.matchers = reprMatcherList(category.matchers);
    }

    return formattedCategory;
};

/**
 * List format of {@link reprCategory}.
 *
 * Formats a list of categories to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param categories List of categories to represent.
 * @returns The formatted categories.
 */
export const reprCategoryList = (categories: Category[]) => {
    return categories.map(reprCategory);
};

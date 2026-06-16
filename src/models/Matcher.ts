import { Model } from 'objection';

import knex from '../db/knex';
import { IClientMatcher } from '../types/clientTypes';
import { TMatchType } from '../types/ModelResponseFormats.types';

Model.knex(knex);

export default class Matcher extends Model {
    id?: string;

    match?: string;

    match_type?: string;

    case_sensitive?: boolean;

    created_on: Date | number | string;

    updated_on: Date | number | string;

    user_id: string;

    static created_on: string;

    static updated_on: string;

    static get tableName() {
        return 'matcher';
    }

    static beforeInsert() {
        const now = new Date().toISOString();
        this.created_on = now;
        this.updated_on = now;
    }

    static $beforeInsert() {
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
            required: ['match', 'match_type', 'case_sensitive'],
            properties: {
                id: { type: 'string' },
                match: { type: 'string', minLength: 1 },
                match_type: { type: 'string', minLength: 1 },
                case_sensitive: { type: 'boolean' },
                created_on: { type: 'string' },
                updated_on: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        const Category = __dirname + '/Category'; // require('./User')
        return {
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: Category,
                join: {
                    from: 'matcher.id',
                    through: {
                        from: 'category_matcher.matcher_id',
                        to: 'category_matcher.category_id',
                    },
                    to: 'category.id',
                },
            },
        };
    }
}

/**
 * Formats a matcher to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param matcher The matcher to return.
 * @returns The formatted matcher.
 */
export const reprMatcher = (matcher: Matcher): IClientMatcher => {
    return {
        caseSensitive: Boolean(matcher.case_sensitive),
        createdOn: matcher.created_on
            ? new Date(matcher.created_on).toISOString()
            : '',
        id: matcher.id ?? '',
        match: matcher.match ?? '',
        matchType: (matcher.match_type as TMatchType) ?? 'exact',
        updatedOn: matcher.updated_on
            ? new Date(matcher.updated_on).toISOString()
            : '',
        userId: matcher.user_id,
    };
};

/**
 * List format of {@link reprMatcher}.
 *
 * Formats a list of matchers to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param matchers List of matchers to represent.
 * @returns The formatted matchers.
 */
export const reprMatcherList = (matchers: Matcher[]) => {
    return matchers.map(reprMatcher);
};

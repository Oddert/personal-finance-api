import { Model } from 'objection';

import knex from '../db/knex';

Model.knex(knex);

export default class CategoryMatcher extends Model {
    id?: string;

    category?: string;

    matcher_id?: string;

    static get tableName() {
        return 'category_matcher';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['category', 'matcher_id'],
            properties: {
                id: { type: 'string' },
                category: { type: 'string' },
                matcher_id: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        const Category = __dirname + '/Category'; // require('./User')
        const Matcher = __dirname + '/Matcher'; // require('./User')
        return {
            categories: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'category_matcher.category_id',
                    to: 'category.id',
                },
            },
            matchers: {
                relation: Model.BelongsToOneRelation,
                modelClass: Matcher,
                join: {
                    from: 'category_matcher.matcher_id',
                    to: 'category.id',
                },
            },
        };
    }
}

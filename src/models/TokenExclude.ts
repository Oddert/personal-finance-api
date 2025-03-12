import { Model } from 'objection'

import knex from '../db/knex'

Model.knex(knex)

export default class TokenExclude extends Model {
    jwt: string
    expires: Date | number

    static get tableName() {
        return 'token_exclude'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'jti',
                'expires',
            ],
            properties: {
                jti: { type: 'string' },
                expires: { type: 'number' },
            },
        }
    }
}
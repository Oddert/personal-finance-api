import { Model } from 'objection';

import knex from '../db/knex';

Model.knex(knex);

export default class TokenExclude extends Model {
    jti: string;

    expires: Date;

    static get idColumn() {
        return 'jti';
    }

    static get tableName() {
        return 'token_exclude';
    }
}

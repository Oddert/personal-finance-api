import { Model } from 'objection';

export default class User extends Model {
    id: string;

    created_on: Date | string;

    updated_on: Date | string;

    static created_on: Date | string;

    static updated_on: Date | string;

    username: string;

    password: string;

    first_name: string;

    last_name: string;

    languages: string;

    default_lang: string;

    currencies: string;

    default_currency: string;

    static get tableName() {
        return 'user';
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

    toJson() {
        return {
            id: this.id,
            createdOn: this.created_on,
            updatedOn: this.updated_on,
            username: this.username,
            firstName: this.first_name,
            lastName: this.last_name,
            languages: this.languages,
            defaultLang: this.default_lang,
            currencies: this.currencies,
            defaultCurrency: this.default_currency,
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string' },
                created_on: { type: 'string' },
                updated_on: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                languages: { type: 'string' },
                default_lang: { type: 'string' },
                currencies: { type: 'string' },
                default_currency: { type: 'string' },
            },
        };
    }
}

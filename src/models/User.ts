import { ColumnNameMappers,Model } from 'objection'

export default class User extends Model {
    id?: number
    created_on: Date | string
    updated_on: Date | string
    static created_on: Date | string
    static updated_on: Date | string
    username: string
    password: string
    first_name: string
    last_name: string
    languages: string
    default_lang: string
    currencies: string
    default_currency: string

    static get tableName() {
        return 'user'
    }

    static beforeInsert() {
        const now = new Date().toISOString()
        this.created_on = now
        this.updated_on = now
    }

    static afterFind() {
        this.created_on = this.created_on ? new Date(this.created_on).toISOString() : ''
        this.updated_on = this.updated_on ? new Date(this.updated_on).toISOString() : ''
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'number' },
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
            }
        }
    }
    
    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                createdOn: obj.created_on,
                updatedOn: obj.updated_on,
                username: obj.username,
                firstName: obj.first_name,
                lastName: obj.last_name,
                languages: obj.languages,
                defaultLang: obj.default_lang,
                currencies: obj.currencies,
                defaultCurrency: obj.default_currency,
                password: obj.password,
            }
        },
        format(obj) {
            return {
                id: obj.id,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
                username: obj.username,
                first_name: obj.firstName,
                last_name: obj.lastName,
                languages: obj.languages,
                default_lang: obj.defaultLang,
                currencies: obj.currencies,
                default_currency: obj.defaultCurrency,
                password: obj.password,
            }
        },
    }
}
import { ColumnNameMappers, Model } from 'objection'

import knex from '../db/knex'

Model.knex(knex)

export default class Transaction extends Model {
    id?: string
    card_id?: number
    date?: Date
    transaction_type?: string
    description?: string
    debit?: number
    credit?: number
    ballance?: number
    created_on: Date | string
    updated_on: Date | string
    currency?: string
    static created_on: Date | string
    static updated_on: Date | string
    category_id?: string

    static get tableName() {
        return 'transaction'
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
                id: { type: 'string' },
                date: { type: 'number' },
                transaction_type: { type: 'string', minLength: 1, maxLength: 5 },
                description: { type: ['string', 'null'] },
                debit: { type: 'number' },
                credit: { type: 'number' },
                ballance: { type: 'number' },
                created_on: { type: 'string' },
                updated_on: { type: 'string' },
                category_id: { type: 'string' },
                currency: { type: 'string' },
            }
        }
    }

    static get relationMappings() {
        const Category = __dirname + '/Category' // require('./User')
        return {
            assignedCategory: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'transaction.category_id',
                    to: 'category.id',
                }
            }
        }
    }
    
    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                currency: obj.currency,
                cardId: obj.card_id,
                date: obj.date,
                transactionType: obj.transaction_type,
                description: obj.description,
                debit: obj.debit,
                credit: obj.credit,
                ballance: obj.ballance,
                createdOn: obj.created_on,
                updatedOn: obj.updated_on,
                categoryId: obj.category_id,
            }
        },
        format(obj) {
            return {
                id: obj.id,
                currency: obj.currency,
                card_id: obj.cardId,
                date: obj.date,
                transaction_type: obj.transactionType,
                description: obj.description,
                debit: obj.debit,
                credit: obj.credit,
                ballance: obj.ballance,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
                category_id: obj.categoryId,
            }
        },
    }
}
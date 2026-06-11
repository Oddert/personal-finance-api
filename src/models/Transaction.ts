import { ColumnNameMappers, Model } from 'objection';

import knex from '../db/knex';
import { reprCategory } from './Category';

Model.knex(knex);

export default class Transaction extends Model {
    id?: string;

    cardId?: string;

    date?: Date;

    transactionType?: string;

    description?: string;

    debit?: number;

    credit?: number;

    ballance?: number;

    createdOn: Date | string;

    updatedOn: Date | string;

    currency?: string;

    static createdOn: Date | string;

    static updatedOn: Date | string;

    categoryId?: string;

    userId: string;

    static get tableName() {
        return 'transaction';
    }

    static beforeInsert() {
        const now = new Date().toISOString();
        this.createdOn = now;
        this.updatedOn = now;
    }

    static afterFind() {
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
            properties: {
                id: { type: 'string' },
                date: { type: 'string' },
                transaction_type: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 5,
                },
                description: { type: ['string', 'null'] },
                user_id: { type: 'string' },
                debit: { type: 'number' },
                credit: { type: 'number' },
                ballance: { type: 'number' },
                createdOn: { type: 'string' },
                updatedOn: { type: 'string' },
                category_id: { type: 'string' },
                currency: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        const Category = __dirname + '/Category'; // require('./User')
        return {
            assignedCategory: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'transaction.categoryId',
                    to: 'category.id',
                },
            },
        };
    }

    toJson() {
        return {
            ballance: this.ballance,
            categoryId: this.categoryId,
            cardId: this.cardId,
            createdOn: new Date(this.createdOn).toISOString(),
            credit: this.credit,
            currency: this.currency,
            date: this.date,
            description: this.description,
            debit: this.debit,
            id: this.id,
            transactionType: this.transactionType,
            updatedOn: new Date(this.updatedOn).toISOString(),
            userId: this.userId,
        };
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                currency: obj.currency,
                cardId: obj.card_id,
                userId: obj.user_id,
                date: obj.date,
                transactionType: obj.transaction_type,
                description: obj.description,
                debit: obj.debit,
                credit: obj.credit,
                ballance: obj.ballance,
                createdOn: obj.created_on,
                updatedOn: obj.updated_on,
                categoryId: obj.category_id,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                currency: obj.currency,
                card_id: obj.cardId,
                user_id: obj.userId,
                date: obj.date,
                transaction_type: obj.transactionType,
                description: obj.description,
                debit: obj.debit,
                credit: obj.credit,
                ballance: obj.ballance,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
                category_id: obj.categoryId,
            };
        },
    };
}

/**
 * Formats a transaction to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param transaction The transaction to return.
 * @returns The formatted transaction.
 */
export const reprTransaction = (transaction: { [key: string]: any }) => {
    return {
        ...transaction,
        createdOn: new Date(transaction.createdOn).toISOString(),
        updatedOn: new Date(transaction.updatedOn).toISOString(),
        date: new Date(transaction.date).toISOString(),
        assignedCategory: transaction.assignedCategory
            ? reprCategory(transaction.assignedCategory)
            : null,
    };
};

/**
 * List format of {@link reprTransaction}.
 *
 * Formats a list of transactions to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param transactions List of transactions to represent.
 * @returns The formatted transactions.
 */
export const reprTransactionList = (transactions: Transaction[]) => {
    return transactions.map(reprTransaction);
};

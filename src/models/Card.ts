import { ColumnNameMappers, Model } from 'objection';

import knex from '../db/knex';
import { IClientCard } from '../types/clientTypes';
import { ICardTypes } from '../types/ModelResponseFormats.types';

Model.knex(knex);

export default class Card extends Model {
    id?: string;

    isDefault: boolean;

    cardName: string;

    cardType: string;

    bankName: string;

    sortCode: number;

    cardNumber: number;

    expires: number;

    description: string;

    icon: string;

    coverImage: string;

    createdOn: string;

    updatedOn: string;

    static created_on: Date | string;

    static updated_on: Date | string;

    static get tableName() {
        return 'card';
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

    static $afterFind() {
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
            required: ['cardName', 'bankName', 'createdOn', 'updatedOn'],
            properties: {
                id: { type: 'string' },
                userId: { type: 'string' },
                isDefault: { type: 'boolean' },
                cardName: { type: 'string' },
                cardType: { type: 'string' },
                bankName: { type: 'string' },
                sortCode: { type: 'number' },
                cardNumber: { type: 'number' },
                expires: { type: 'string' },
                description: { type: 'string' },
                icon: { type: 'string' },
                coverImage: { type: 'string' },
                createdOn: { type: 'string' },
                updatedOn: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        // const BudgetRow = __dirname + '/BudgetRow'
        return {};
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                userId: obj.user_id,
                isDefault: obj.is_default,
                cardName: obj.card_name,
                cardType: obj.card_type,
                bankName: obj.bank_name,
                sortCode: obj.sort_code,
                cardNumber: obj.card_number,
                expires: obj.expires,
                description: obj.description,
                icon: obj.icon,
                coverImage: obj.cover_image,
                createdOn: obj.created_on,
                updatedOn: obj.updated_on,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                user_id: obj.userId,
                is_default: obj.isDefault,
                card_name: obj.cardName,
                card_type: obj.cardType,
                bank_name: obj.bankName,
                sort_code: obj.sortCode,
                card_number: obj.cardNumber,
                expires: obj.expires,
                description: obj.description,
                icon: obj.icon,
                cover_image: obj.coverImage,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
            };
        },
    };
}

/**
 * Formats a card to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param card The card to return.
 * @returns The formatted card.
 */
export const reprCard = (card: Card) => {
    const formattedCard: IClientCard = {
        bankName: card.bankName,
        cardName: card.cardName,
        cardNumber: card.cardNumber,
        cardType: card.cardType as ICardTypes,
        coverImage: card.coverImage,
        createdOn: card.createdOn,
        description: card.description,
        expires: card.expires,
        icon: card.icon,
        id: card.id ?? '',
        isDefault: card.isDefault,
        sortCode: card.sortCode,
        updatedOn: card.updatedOn,
    };

    return formattedCard;
};

/**
 * List format of {@link reprCard}.
 *
 * Formats a list of cards to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param cards List of cards to represent.
 * @returns The formatted cards.
 */
export const reprCardList = (cards: Card[]) => {
    return cards.map(reprCard);
};

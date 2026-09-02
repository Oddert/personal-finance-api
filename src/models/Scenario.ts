import { ColumnNameMappers, Model } from 'objection';
import type {
    IClientScenario,
    IClientScenarioCardBridge,
} from '../types/clientTypes';
import { reprTransactorList } from './Transactor';
import type Transactor from './Transactor';
import type Card from './Card';

export class ScenarioCardBridge extends Model {
    id: string;

    scenarioId: string;

    card?: Card;

    cardId: string;

    calcStartDate: string;

    calcEndDate: string;

    displayStartDate: string;

    displayEndDate: string;

    startBalance: number;

    note: string;

    static get tableName() {
        return 'scenario_card_bridge';
    }

    static get relationMappings() {
        const Card = __dirname + '/Card';
        return {
            card: {
                relation: Model.HasOneRelation,
                modelClass: Card,
                join: {
                    from: 'scenario_card_bridge.card_id',
                    to: 'card.id',
                },
            },
        };
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                scenarioId: obj.scenario_id,
                cardId: obj.card_id,
                calcStartDate: obj.calc_start_date,
                calcEndDate: obj.calc_end_date,
                displayStartDate: obj.display_start_date,
                displayEndDate: obj.display_end_date,
                startBalance: obj.start_balance,
                note: obj.note,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                scenario_id: obj.scenarioId,
                card_id: obj.cardId,
                calc_start_date: obj.calcStartDate,
                calc_end_date: obj.calcEndDate,
                display_start_date: obj.displayStartDate,
                display_end_date: obj.displayEndDate,
                start_balance: obj.startBalance,
                note: obj.note,
            };
        },
    };
}

/**
 * Formats a SCB to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param scb The scenario card bridge to return.
 * @returns The formatted scenario.
 */
export const reprScenarioCardBridge = (
    scb: ScenarioCardBridge,
): IClientScenarioCardBridge => ({
    id: scb.id,
    scenarioId: scb.scenarioId,
    cardId: scb.cardId,
    cardName: scb.card?.cardName ?? '',
    calcStartDate: scb.calcStartDate,
    calcEndDate: scb.calcEndDate ?? null,
    displayStartDate: scb.displayStartDate,
    displayEndDate: scb.displayEndDate ?? null,
    startBalance: scb.startBalance,
    note: scb.note ?? null,
});

/**
 * List format of {@link reprScenarioCardBridge}.
 *
 * Formats a list of scenario card bridges to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param scbList List of scenario card bridges to represent.
 * @returns The formatted scenarios.
 */
export const reprScenarioCardBridgeList = (
    scbList: ScenarioCardBridge[],
): IClientScenarioCardBridge[] => {
    return scbList.map(reprScenarioCardBridge);
};

export default class Scenario extends Model {
    id?: string;

    startDate?: Date | string | null;

    endDate?: Date | string | null;

    cardId: string;

    userId: string;

    static startDate: Date | string;

    static endDate: Date | string;

    static createdOn: Date | string;

    static updatedOn: Date | string;

    createdOn: Date | string;

    updatedOn: Date | string;

    title: string;

    description: string;

    startBallance?: number;

    cards?: ScenarioCardBridge[];

    transactors?: Transactor[];

    static get tableName() {
        return 'scenario';
    }

    $beforeInsert() {
        const now = new Date().toISOString();
        this.createdOn = now;
        this.updatedOn = now;
        this.startDate = this.startDate
            ? new Date(this.startDate).toISOString()
            : '';
        this.endDate = this.endDate ? new Date(this.endDate).toISOString() : '';
    }

    $afterFind() {
        this.createdOn = this.createdOn
            ? new Date(this.createdOn).toISOString()
            : '';
        this.updatedOn = this.updatedOn
            ? new Date(this.updatedOn).toISOString()
            : '';
        this.startDate = this.startDate
            ? new Date(this.startDate).toISOString()
            : '';
        this.endDate = this.endDate ? new Date(this.endDate).toISOString() : '';
    }

    toJson() {
        return {
            id: this.id,
            cardId: this.cardId,
            userId: this.userId,
            startDate: this.startDate,
            endDate:
                typeof this.endDate === 'string'
                    ? this.endDate.length
                        ? this.endDate
                        : null
                    : this.endDate,
            createdOn: this.createdOn,
            updatedOn: this.updatedOn,
            title: this.title,
            description: this.description,
            startBallance: this.startBallance,
            cards: reprScenarioCardBridgeList(this.cards ?? []),
            transactors: reprTransactorList(this.transactors ?? []),
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string' },
                cardId: { type: 'string' },
                userId: { type: 'string' },
                createdOn: { type: 'string' },
                updated_on: { type: 'string' },
                startDate: { type: ['string', 'null'] },
                endDate: { type: ['string', 'null'] },
                title: { type: 'string' },
                description: { type: 'string' },
                startBallance: { type: ['number', 'null'] },
            },
        };
    }

    static get relationMappings() {
        const Transactor = __dirname + '/Transactor';
        return {
            cards: {
                relation: Model.HasManyRelation,
                modelClass: ScenarioCardBridge,
                join: {
                    from: 'scenario.id',
                    to: 'scenario_card_bridge.scenario_id',
                },
            },
            transactors: {
                relation: Model.HasManyRelation,
                modelClass: Transactor,
                join: {
                    from: 'scenario.id',
                    to: 'transactor.scenario_id',
                },
            },
        };
    }

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                startDate: obj.start_date,
                endDate: obj.end_date,
                cardId: obj.card_id,
                userId: obj.user_id,
                createdOn: obj.created_on,
                updatedOn: obj.updated_on,
                title: obj.title,
                description: obj.description,
                startBallance: obj.start_ballance,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                start_date: obj.startDate,
                end_date: obj.endDate,
                card_id: obj.cardId,
                user_id: obj.userId,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
                title: obj.title,
                description: obj.description,
                start_ballance: obj.startBallance,
            };
        },
    };
}

/**
 * Formats a scenario to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param scenario The scenario to return.
 * @returns The formatted scenario.
 */
export const reprScenario = (scenario: Scenario): IClientScenario => {
    const formattedScenario: IClientScenario = {
        cardId: scenario.cardId,
        createdOn: scenario.createdOn
            ? new Date(scenario.createdOn).toISOString()
            : '',
        description: scenario.description,
        endDate: scenario.endDate
            ? new Date(scenario.endDate).toISOString()
            : null,
        id: scenario.id ?? '',
        startDate: scenario.startDate
            ? new Date(scenario.startDate).toISOString()
            : null,
        startBallance: scenario.startBallance ?? 0,
        title: scenario.title,
        userId: scenario.userId,
        updatedOn: scenario.updatedOn
            ? new Date(scenario.updatedOn).toISOString()
            : '',
    };

    if (scenario.cards) {
        formattedScenario.cards = reprScenarioCardBridgeList(scenario.cards);
    }

    if (scenario.transactors) {
        formattedScenario.transactors = reprTransactorList(
            scenario.transactors,
        );
    }

    return formattedScenario;
};

/**
 * List format of {@link reprScenario}.
 *
 * Formats a list of scenarios to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param scenarios List of scenarios to represent.
 * @returns The formatted scenarios.
 */
export const reprScenarioList = (scenarios: Scenario[]): IClientScenario[] => {
    return scenarios.map(reprScenario);
};

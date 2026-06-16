import { ColumnNameMappers, Model } from 'objection';
import { IClientScenario } from '../types/clientTypes';
import { reprTransactorList } from './Transactor';

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

    transactors?: any[];

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
            transactors: this.transactors?.map((transactor) =>
                transactor.toJson(),
            ),
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

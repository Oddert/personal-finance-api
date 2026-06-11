import { ColumnNameMappers, Model } from 'objection';
import { IClientScenario } from '../types/clientTypes';
import { reprTransactorList } from './Transactor';

export default class Scenario extends Model {
    id?: string;

    start_date?: Date | string;

    end_date?: Date | string;

    card_id: string;

    user_id: string;

    static start_date: Date | string;

    static end_date: Date | string;

    created_on: Date | string;

    updated_on: Date | string;

    static created_on: Date | string;

    static updated_on: Date | string;

    title: string;

    description: string;

    start_ballance?: number;

    transactors?: any[];

    static get tableName() {
        return 'scenario';
    }

    $beforeInsert() {
        const now = new Date().toISOString();
        this.created_on = now;
        this.updated_on = now;
        this.start_date = this.start_date
            ? new Date(this.start_date).toISOString()
            : '';
        this.end_date = this.end_date
            ? new Date(this.end_date).toISOString()
            : '';
    }

    $afterFind() {
        this.created_on = this.created_on
            ? new Date(this.created_on).toISOString()
            : '';
        this.updated_on = this.updated_on
            ? new Date(this.updated_on).toISOString()
            : '';
        this.start_date = this.start_date
            ? new Date(this.start_date).toISOString()
            : '';
        this.end_date = this.end_date
            ? new Date(this.end_date).toISOString()
            : '';
    }

    toJson() {
        return {
            id: this.id,
            cardId: this.card_id,
            userId: this.user_id,
            startDate: this.start_date,
            endDate:
                typeof this.end_date === 'string'
                    ? this.end_date.length
                        ? this.end_date
                        : null
                    : this.end_date,
            createdOn: this.created_on,
            updatedOn: this.updated_on,
            title: this.title,
            description: this.description,
            startBallance: this.start_ballance,
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
                card_id: { type: 'string' },
                user_id: { type: 'string' },
                created_on: { type: 'string' },
                updated_on: { type: 'string' },
                start_date: { type: ['string', 'null'] },
                end_date: { type: ['string', 'null'] },
                title: { type: 'string' },
                description: { type: 'string' },
                start_ballance: { type: ['number', 'null'] },
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
        cardId: scenario.card_id,
        createdOn: scenario.created_on
            ? new Date(scenario.created_on).toISOString()
            : null,
        description: scenario.description,
        endDate: scenario.end_date
            ? new Date(scenario.end_date).toISOString()
            : null,
        id: scenario.id ?? '',
        startDate: scenario.start_date
            ? new Date(scenario.start_date).toISOString()
            : null,
        startBallance: scenario.start_ballance ?? 0,
        title: scenario.title,
        userId: scenario.user_id,
        updatedOn: scenario.updated_on
            ? new Date(scenario.updated_on).toISOString()
            : null,
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

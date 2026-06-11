import { Model } from 'objection';
import { IClientTransactor } from '../types/clientTypes';
import { reprSchedulerList } from './Scheduler';

export default class Transactor extends Model {
    id?: string;

    category_id: string | null;

    created_on: Date | string;

    updated_on: Date | string;

    static created_on: Date | string;

    static updated_on: Date | string;

    description: string;

    is_addition: boolean;

    value: number;

    scenario_id: string;

    schedulers: any[];

    static get tableName() {
        return 'transactor';
    }

    $beforeInsert() {
        const now = new Date().toISOString();
        this.created_on = now;
        this.updated_on = now;
    }

    $afterFind() {
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
            categoryId: this.category_id,
            updatedOn: this.updated_on,
            description: this.description,
            isAddition: Boolean(this.is_addition),
            value: this.value,
            scenarioId: this.scenario_id,
            schedulers: this?.schedulers.map((scheduler) => scheduler.toJson()),
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string' },
                created_on: { type: 'string' },
                category_id: { type: 'string' },
                updated_on: { type: 'string' },
                description: { type: 'string' },
                value: { type: 'number' },
                scenario_id: { type: 'string' },
            },
        };
    }

    static get relationMappings() {
        const Scenario = __dirname + '/Scenario';
        const Scheduler = __dirname + '/Scheduler';
        return {
            assignedScenario: {
                relation: Model.BelongsToOneRelation,
                modelClass: Scenario,
                join: {
                    from: 'transactor.scenario_id',
                    to: 'scenario.id',
                },
            },
            schedulers: {
                relation: Model.HasManyRelation,
                modelClass: Scheduler,
                join: {
                    from: 'transactor.id',
                    to: 'scheduler.transactor_id',
                },
            },
        };
    }
}

/**
 * Formats a transactor to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param transactor The transactor to return.
 * @returns The formatted transactor.
 */
export const reprTransactor = (transactor: Transactor): IClientTransactor => {
    const formattedTransactor: IClientTransactor = {
        categoryId: transactor.category_id ?? '',
        createdOn: transactor.created_on
            ? new Date(transactor.created_on).toISOString()
            : null,
        description: transactor.description,
        id: transactor.id ?? '',
        isAddition: Boolean(transactor.is_addition),
        scenarioId: transactor.scenario_id,
        updatedOn: transactor.updated_on
            ? new Date(transactor.updated_on).toISOString()
            : null,
        value: transactor.value,
    };

    if (transactor.schedulers) {
        formattedTransactor.schedulers = reprSchedulerList(
            transactor.schedulers,
        );
    }

    return formattedTransactor;
};

/**
 * List format of {@link reprTransactor}.
 *
 * Formats a list of transactors to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param transactors List of transactors to represent.
 * @returns The formatted transactors.
 */
export const reprTransactorList = (
    transactors: Transactor[],
): IClientTransactor[] => {
    return transactors.map(reprTransactor);
};

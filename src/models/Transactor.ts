import { Model } from 'objection';

export default class Transactor extends Model {
    id?: string;

    created_on: Date | string;

    updated_on: Date | string;

    static created_on: Date | string;

    static updated_on: Date | string;

    description: string;

    is_addition: boolean;

    value: number;

    scenario_id: string;

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
            updatedOn: this.updated_on,
            description: this.description,
            isAddition: Boolean(this.is_addition),
            value: this.value,
            scenarioId: this.scenario_id,
            // @ts-expect-error ORM types do not recognise relations
            schedulers: this?.schedulers.map((scheduler) => scheduler.toJson()),
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string' },
                created_on: { type: 'string' },
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

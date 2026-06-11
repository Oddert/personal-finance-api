import { Model } from 'objection';
import { IClientScheduler } from '../types/clientTypes';

export default class Scheduler extends Model {
    id?: string;

    created_on: Date | string;

    updated_on: Date | string;

    static created_on: Date | string;

    static updated_on: Date | string;

    static start_date: Date | string;

    scheduler_code: string;

    step?: number;

    start_date?: Date | string;

    day?: number;

    nth_day?: number;

    transactor_id: string;

    static get tableName() {
        return 'scheduler';
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
        this.start_date = this.start_date
            ? new Date(this.start_date).toISOString()
            : '';
    }

    toJson() {
        return {
            id: this.id,
            createdOn: this.created_on
                ? new Date(this.created_on).toISOString()
                : null,
            updatedOn: this.updated_on
                ? new Date(this.updated_on).toISOString()
                : null,
            schedulerCode: this.scheduler_code,
            step: this.step,
            startDate: this.start_date
                ? new Date(this.start_date).toISOString()
                : null,
            day: this.day,
            nthDay: this.nth_day,
            transactorId: this.transactor_id,
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string' },
                created_on: { type: 'string' },
                updated_on: { type: 'string' },
                start_date: { type: ['string', 'null'] },
                scheduler_code: { type: 'string' },
                step: { type: ['number', 'null'] },
                day: { type: ['number', 'null'] },
                nth_day: { type: ['number', 'null'] },
                transactor_id: { type: ['string', 'null'] },
            },
        };
    }

    static get relationMappings() {
        const Transactor = __dirname + '/Transactor';
        return {
            transactor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Transactor,
                join: {
                    from: 'scheduler.transactor_id',
                    to: 'transactor.id',
                },
            },
        };
    }
}

/**
 * Formats a scheduler to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param scheduler The scheduler to return.
 * @returns The formatted scheduler.
 */
export const reprScheduler = (scheduler: Scheduler): IClientScheduler => {
    const formattedScheduler: IClientScheduler = {
        createdOn: scheduler.created_on
            ? new Date(scheduler.created_on).toISOString()
            : null,
        id: scheduler.id ?? '',
        schedulerCode: scheduler.scheduler_code,
        transactorId: scheduler.transactor_id,
        updatedOn: scheduler.updated_on
            ? new Date(scheduler.updated_on).toISOString()
            : null,
    };

    if (scheduler.day) {
        formattedScheduler.day = scheduler.day;
    }
    if (scheduler.nth_day) {
        formattedScheduler.nthDay = scheduler.nth_day;
    }
    if (scheduler.step) {
        formattedScheduler.step = scheduler.step;
    }
    if (scheduler.start_date) {
        formattedScheduler.startDate = new Date(
            scheduler.start_date,
        ).toISOString();
    }

    return formattedScheduler;
};

/**
 * List format of {@link reprScheduler}.
 *
 * Formats a list of schedulers to a standard representation, validating fields and enforcing type consistency.
 *
 * Used to circumvent Objection's in-built representation methods due to persistent inconsistencies.
 * @param schedulers List of schedulers to represent.
 * @returns The formatted schedulers.
 */
export const reprSchedulerList = (
    schedulers: Scheduler[],
): IClientScheduler[] => {
    return schedulers.map(reprScheduler);
};

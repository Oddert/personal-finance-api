import { ColumnNameMappers, Model } from 'objection';

import { IClientScheduler } from '../types/clientTypes';

export default class Scheduler extends Model {
    id?: string;

    createdOn: Date | string;

    updatedOn: Date | string;

    static createdOn: Date | string;

    static updatedOn: Date | string;

    static startDate: Date | string;

    schedulerCode: string;

    step?: number;

    startDate?: Date | string;

    day?: number;

    nthDay?: number;

    transactorId: string;

    static get tableName() {
        return 'scheduler';
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
        this.startDate = this.startDate
            ? new Date(this.startDate).toISOString()
            : '';
    }

    toJson() {
        return {
            id: this.id,
            createdOn: this.createdOn
                ? new Date(this.createdOn).toISOString()
                : null,
            updatedOn: this.updatedOn
                ? new Date(this.updatedOn).toISOString()
                : null,
            schedulerCode: this.schedulerCode,
            step: this.step,
            startDate: this.startDate
                ? new Date(this.startDate).toISOString()
                : null,
            day: this.day,
            nthDay: this.nthDay,
            transactorId: this.transactorId,
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string' },
                createdOn: { type: 'string' },
                updatedOn: { type: 'string' },
                startDate: { type: ['string', 'null'] },
                schedulerCode: { type: 'string' },
                step: { type: ['number', 'null'] },
                day: { type: ['number', 'null'] },
                nthDay: { type: ['number', 'null'] },
                transactorId: { type: ['string', 'null'] },
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

    static columnNameMappers: ColumnNameMappers = {
        parse(obj) {
            return {
                id: obj.id,
                createdOn: obj.created_on,
                updatedOn: obj.updated_on,
                schedulerCode: obj.scheduler_code,
                step: obj.step,
                startDate: obj.start_date,
                day: obj.day,
                nthDay: obj.nth_day,
                transactorId: obj.transactor_id,
            };
        },
        format(obj) {
            return {
                id: obj.id,
                created_on: obj.createdOn,
                updated_on: obj.updatedOn,
                scheduler_code: obj.schedulerCode,
                step: obj.step,
                start_date: obj.startDate,
                day: obj.day,
                nth_day: obj.nthDay,
                transactor_id: obj.transactorId,
            };
        },
    };
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
        createdOn: scheduler.createdOn
            ? new Date(scheduler.createdOn).toISOString()
            : '',
        day: null,
        id: scheduler.id ?? '',
        nthDay: null,
        schedulerCode: scheduler.schedulerCode,
        startDate: null,
        step: null,
        transactorId: scheduler.transactorId,
        updatedOn: scheduler.updatedOn
            ? new Date(scheduler.updatedOn).toISOString()
            : '',
    };

    if (scheduler.day) {
        formattedScheduler.day = scheduler.day;
    }
    if (scheduler.nthDay) {
        formattedScheduler.nthDay = scheduler.nthDay;
    }
    if (scheduler.step) {
        formattedScheduler.step = scheduler.step;
    }
    if (scheduler.startDate) {
        formattedScheduler.startDate = new Date(
            scheduler.startDate,
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

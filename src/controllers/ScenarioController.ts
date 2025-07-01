import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { IUserRequest } from '../types/Auth.types';

import {
    respondBadRequest,
    respondCreated,
    respondOk,
} from '../utils/responses';

import Scenario from '../models/Scenario';

dayjs.extend(customParseFormat);

/**
 * Returns all Categories belonging to  the authenticated user.
 */
export const getScenarios = async (req: IUserRequest, res: Response) => {
    try {
        const startDate =
            typeof req.query?.from === 'string'
                ? dayjs(req.query.from, 'DD/MM/YYYY').valueOf()
                : dayjs(0).valueOf();

        const endDate =
            typeof req.query?.to === 'string'
                ? dayjs(req.query.to, 'DD/MM/YYYY').valueOf()
                : dayjs(undefined).valueOf();

        if (req.query?.from || req.query?.to) {
            const scenarios = await Scenario.query()
                .where('user_id', '=', req.user.id)
                .whereBetween('start_date', [startDate, endDate])
                .withGraphFetched('transactors.[schedulers]')
                .orderBy('title', 'DESC');

            return respondOk({ req, res, payload: { scenarios } });
        }

        const scenarios = await Scenario.query()
            .where('user_id', '=', req.user.id)
            .withGraphFetched('transactors.[schedulers]')
            .orderBy('title', 'DESC');

        return respondOk({
            req,
            res,
            payload: {
                scenarios: scenarios.map((scenario) => scenario.toJson()),
            },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Retrieves a single Scenario item by ID with Budget Rows joined. Budget must belong to the authenticated user.
 */
export const getSingleScenario = async (req: IUserRequest, res: Response) => {
    try {
        const scenario = await Scenario.query()
            .where('user_id', '=', req.user.id)
            .findById(req.params.id)
            .withGraphFetched('transactors.[schedulers]');

        return respondOk({
            req,
            res,
            payload: { scenario: scenario?.toJson() },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Creates a single new Scenario and returns the result.
 */
export const createSingleScenario = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const body = { ...req.body, id: uuid() };

        const scenario = req.body.transactors
            ? await Scenario.query().insertGraphAndFetch(body)
            : await Scenario.query().insertAndFetch(body);

        return respondCreated({
            req,
            res,
            payload: { scenario: scenario.toJson() },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Updates a single Scenario belonging to the authenticated user.
 */
export const updateSingleScenario = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const now = new Date().toISOString();
        const body = {
            updated_on: now,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            title: req.body.title,
            description: req.body.description,
            start_ballance: req.body.startBallance,
            transactors: req.body.transactors.map((transactor: any) => ({
                updated_on: now,
                description: transactor.description,
                is_addition: transactor.isAddition,
                value: transactor.value,
                scenario_id: transactor.scenarioId,
                schedulers: transactor.schedulers.map((scheduler: any) => ({
                    updated_on: now,
                    scheduler_code: scheduler.schedulerCode,
                    step: scheduler.step,
                    start_date: scheduler.startDate,
                    day: scheduler.day,
                    nth_day: scheduler.nthDay,
                    transactor_id: scheduler.transactorId,
                })),
            })),
        };

        const scenario = await Scenario.query()
            .where('user_id', '=', req.user.id)
            .patchAndFetchById(req.params.id, body);

        return respondCreated({
            req,
            res,
            payload: { scenario: scenario.toJson() },
            message: req.t('scenario.messages.updatedSuccessfully'),
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Deletes a single Scenario by ID. Category must belong to the authenticated user.
 */
export const deleteSingleScenario = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        await Scenario.query()
            .where('user_id', '=', req.user.id)
            .deleteById(req.params.id);

        return respondOk({
            req,
            res,
            message: req.t('scenario.messages.deletedSuccessfully'),
            statusCode: 204,
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Creates one or more Scenarios at a time and returns the result as an array.
 */
export const createManyScenarios = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString();
        const createdScenarios = [];

        for (const transaction of req.body.transactions) {
            const body = {
                ...transaction,
                created_on: date,
                updated_on: date,
                id: uuid(),
            };

            const createdScenario =
                await Scenario.query().insertGraphAndFetch(body);
            createdScenarios.push(createdScenario.toJson());
        }

        return respondCreated({
            req,
            res,
            payload: { createdScenarios },
            message: req.t('scenario.messages.scenariosCreated'),
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Deletes a list of Scenarios belonging to a user.
 */
export const deleteManyScenarios = async (req: IUserRequest, res: Response) => {
    try {
        const deletedScenarios = [];

        for (const scenarioId of req.body.scenarios) {
            const deleted = await Scenario.query()
                .where('user_id', '=', req.user.id)
                .deleteById(scenarioId);

            deletedScenarios.push(deleted);
        }

        return respondOk({
            req,
            res,
            message: req.t('scenario.messages.deletedSuccessfully'),
            statusCode: 204,
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

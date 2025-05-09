import { Response } from 'express'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { IUserRequest } from '../types/Auth.types'

import { respondBadRequest, respondCreated, respondOk } from '../utils/responses'

import Scenario from '../models/Scenario'

dayjs.extend(customParseFormat)

export const getScenarios = async (req: IUserRequest, res: Response) => {
    try {
        const startDate = typeof req.query?.from === 'string'
            ? dayjs(req.query.from, 'DD/MM/YYYY').valueOf()
            : dayjs(0).valueOf()

        const endDate = typeof req.query?.to === 'string'
            ? dayjs(req.query.to, 'DD/MM/YYYY').valueOf()
            : dayjs(undefined).valueOf()

        if (req.query?.from || req.query?.to) {
            const scenarios = await Scenario.query()
                .where('user_id', '=', req.user.id)
                .whereBetween('start_date', [startDate, endDate])
                .withGraphFetched('transactors.[schedulers]')
                .orderBy('title', 'DESC')
    
            return respondOk(req, res, { scenarios })
        }
        
        const scenarios = await Scenario.query()
            .where('user_id', '=', req.user.id)
            .withGraphFetched('transactors.[schedulers]')
            .orderBy('title', 'DESC')
            
        return respondOk(req, res, { scenarios })
    } catch (error: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const createSingleScenario = async (req: IUserRequest, res: Response) => {
    try {
        const body = { ...req.body, id: uuid() }

        const scenario = req.body.transactors
            ? await Scenario.query().insertGraphAndFetch(body)
            : await Scenario.query().insertAndFetch(body)

        return respondCreated(req, res, { scenario })
    } catch (error: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const getSingleScenario = async (req: IUserRequest, res: Response) => {
    try {
        const scenario = await Scenario.query()
            .where('user_id', '=', req.user.id)
            .findById(req.params.id)
            .withGraphFetched('transactors.[schedulers]')

        return respondOk(req, res, { scenario })
    } catch (error: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const updateSingleScenario = async (req: IUserRequest, res: Response) => {
    try {
        const now = new Date().toISOString()
        const body = { ...req.body, updated_on: now }
        const scenario = await Scenario.query().where('user_id', '=', req.user.id).patchAndFetchById(req.params.id, body)

        return respondCreated(req, res, { scenario }, 'Scenario updated successfully', 201)
    } catch (error: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const deleteSingleScenario = async (req: IUserRequest, res: Response) => {
    try {
        await Scenario.query()
            .where('user_id', '=', req.user.id)
            .deleteById(req.params.id)

        return respondOk(req, res, null, 'Delete operation successful.', 204)
    } catch(err: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err.message)
    }
}

export const createManyScenarios = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const createdScenarios = []

        for (const transaction of req.body.transactions) {
            const body = { ...transaction, created_on: date, updated_on: date, id: uuid() }
    
            const createdTransaction = await Scenario.query().insertGraphAndFetch(body)
            createdScenarios.push(createdTransaction)
        }

        return respondCreated(req, res, { createdScenarios }, 'Transactions created successfully')
    } catch(err: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err.message)
    }
}

export const deleteManyScenarios = async (req: IUserRequest, res: Response) => {
    try {
        const deletedScenarios = []

        for (const scenarioId of req.body.scenarios) {
            const deleted = await Scenario.query()
                .where('user_id', '=', req.user.id)
                .deleteById(scenarioId)

            deletedScenarios.push(deleted)
        }
        
        return respondOk(req, res, null, 'Delete operation successful.', 204)
    } catch(err: any) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err.message)
    }
}

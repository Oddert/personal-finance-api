import {Request, Response} from 'express'

import { respondBadRequest, respondCreated, respondNotFound, respondOk } from '../utils/responses'

import Matcher from '../models/Matcher'

export const getMatchers = async (req: Request, res: Response) => {
    try {
        const matchers = await Matcher.query()
        return respondOk(req, res, { matchers })
    } catch(err) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err)
    }
}

export const getSingleMatcher = async (req: Request, res: Response) => {
    try {
        const matcher = await Matcher.query().findById(req.params.id)
        if (!matcher) {
            return respondNotFound(req, res, { id: req.params.id })
        }
        return respondOk(req, res, { matcher })
    } catch(err) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err)
    }
}

export const createSingleMatcher = async (req: Request, res: Response) => {
    try {
        const date = new Date().toISOString()
        const body = { ...req.body, created_on: date, updated_on: date }
        const matcher = await Matcher.query().insert(body)
        return respondCreated(req, res, { matcher })
    } catch(err) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err)
    }
}

export const updateSingleMatcher = async (req: Request, res: Response) => {
    try {
        const body = { ...req.body, updated_on: new Date().toISOString() }
        const matcher = await Matcher.query()
            .patchAndFetchById(req.params.id, body)
        matcher.created_on = new Date(matcher.created_on).toISOString()
        return respondOk(req, res, { matcher })
    } catch(err) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err)
    }
}

export const deleteSingleMatcher = async (req: Request, res: Response) => {
    try {
        await Matcher.relatedQuery('categories').for(req.params.id).unrelate()
        const deleted = await Matcher.query()
            .deleteById(req.params.id)
        return respondOk(req, res, { deleted }, 'Delete operation successful.', 204)
    } catch(err) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err)
    }
}

export const createManyMatchers = async (req: Request, res: Response) => {
    try {
        const date = new Date().toISOString()
        const createdMatchers = []
        for (const matcher of req.body.payload.matchers) {
            const body = { ...matcher, created_on: date, updated_on: date }
            const createdMatcher = await Matcher.query().insert(body)
            createdMatchers.push(createdMatcher)
        }
        return respondCreated(req, res, { createdMatchers }, 'Matchers created successfully', 204)
    } catch(err) {
        return respondBadRequest(req, res, null, 'Something went wrong processing your request', 500, err)
    }
}
import { Response} from 'express'
import { v4 as uuid } from 'uuid'

import { IUserRequest } from '../types/Auth.types'

import { respondBadRequest, respondCreated, respondNotFound, respondOk } from '../utils/responses'

import Matcher from '../models/Matcher'
import Category from '../models/Category'

export const getMatchers = async (req: IUserRequest, res: Response) => {
    try {
        const matchers = await Matcher.query().where('user_id', '=', req.user.id)
        return respondOk({ req, res, payload: { matchers } })
    } catch(error: any) {
        return respondBadRequest({ req, res, error: error.message })
    }
}

export const getSingleMatcher = async (req: IUserRequest, res: Response) => {
    try {
        const matcher = await Matcher.query().findById(req.params.id).where('user_id', '=', req.user.id)
        if (!matcher) {
            return respondNotFound({
                req,
                res,
                message: req.t('matcher.messages.notFoundById', { matcherId: req.params.id }),
            })
        }
        return respondOk({ req, res, payload: { matcher } })
    } catch(error: any) {
        return respondBadRequest({ req, res, error: error.message })
    }
}

export const createSingleMatcher = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const body = { ...req.body, created_on: date, updated_on: date, user_id: req.user.id, id: uuid() }
        delete body?.categoryId
        const matcher = await Matcher.query().insertAndFetch(body)
        if (req.body?.categoryId) {
            await Category.relatedQuery('matchers').for(req.body.categoryId).relate(matcher)
        }
        return respondCreated({ req, res, payload: { matcher } })
    } catch(error: any) {
        return respondBadRequest({ req, res, error: error.message })
    }
}

export const updateSingleMatcher = async (req: IUserRequest, res: Response) => {
    try {
        const body = { ...req.body, updated_on: new Date().toISOString() }
        const matcher = await Matcher.query()
            .where('user_id', '=', req.user.id)
            .patchAndFetchById(req.params.id, body)
        matcher.created_on = new Date(matcher.created_on).toISOString()
        return respondCreated({
            req,
            res,
            payload: { matcher },
            message: req.t('matcher.messages.updatedSuccessfully'),
        })
    } catch(error: any) {
        return respondBadRequest({ req, res, error: error.message })
    }
}

export const deleteSingleMatcher = async (req: IUserRequest, res: Response) => {
    try {
        await Matcher.relatedQuery('categories')
            .where('user_id', '=', req.user.id)
            .for(req.params.id)
            .unrelate()

        await Matcher.query()
            .deleteById(req.params.id)

        return respondOk({
            req,
            res,
            message: req.t('matcher.messages.deletedSuccessfully'),
            statusCode: 204,
        })
    } catch(error: any) {
        return respondBadRequest({ req, res, error: error.message })
    }
}

export const createManyMatchers = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const createdMatchers = []

        for (const matcher of req.body.matchers) {
            const body = { ...matcher, created_on: date, updated_on: date, user_id: req.user.id, id: uuid() }
            const createdMatcher = await Matcher.query().insertAndFetch(body)
            createdMatchers.push(createdMatcher)
        }

        return respondCreated({
            req,
            res,
            payload: { createdMatchers },
            message: req.t('matcher.messages.matchersCreated'),
        })
    } catch(error: any) {
        return respondBadRequest({ req, res, error: error.message })
    }
}
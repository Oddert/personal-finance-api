import { Request, Response } from 'express'

import { respondServerError, respondOk } from '../utils/responses'

import CategoryMatcher from '../models/CategoryMatcher'
import Matcher from '../models/Matcher'
import Scenario from '../models/Scenario'
import Category from '../models/Category'
import Transactor from '../models/Transactor'
import Scheduler from '../models/Scheduler'
import Transaction from '../models/Transaction'
import TokenExclude from '../models/TokenExclude'
import User from '../models/User'

export const resetServer = async (req: Request, res: Response) => {
    try {
        // const result = knex('category_matcher')
        return respondOk({ res })
    } catch(err: any) {
        return respondServerError({ res, error: err.message })
    }
}

export const getMatcherCategory = async (req: Request, res: Response) => {
    try {
        const result = await CategoryMatcher.query()
        return respondOk({ res, payload: { result } })
    } catch(err: any) {
        return respondServerError({ res, error: err.message })
    }
}

/**
 * Retrieves a list of all data from all tables in a format ready to be used as seed data.
 */
export const getSeeds = async (req: Request, res: Response) => {
    try {
        const matchers = (await Matcher.query()).map((datum) => ({
            ...datum,
            case_sensitive: Boolean(datum.case_sensitive),
        }))
        const categories = await Category.query()
        const category_matcher = await CategoryMatcher.query()
        const scenario = (await Scenario.query()).map((datum) => ({
            ...datum,
            start_date: datum.start_date === '' ? null : datum.start_date,
            end_date: datum.end_date === '' ? null : datum.end_date,
        }))
        const transactor = (await Transactor.query()).map((datum) => ({
            ...datum,
            is_addition: Boolean(datum.is_addition),
        }))
        const scheduler = await Scheduler.query()
        const transaction = await Transaction.query()
        return respondOk({
            res,
            payload: {
                matchers,
                categories,
                category_matcher,
                scenario,
                transactor,
                scheduler,
                transaction,
            }
        })
    } catch (error: any) {
        respondServerError({ res, error: error.message })
    }
}

/**
 * Returns all token exclude records for debugging JWT refresh logic.
 */
export const getTokenExclude = async (req: Request, res: Response) => {
    try {
        const tokenExcludeRaw = await TokenExclude.query()
        const tokenExclude: any[] = tokenExcludeRaw.map((token) => ({ jti: token.jti, expires: new Date(token.expires).toISOString() }))

        return respondOk({ res, payload: {tokenExclude} })
    } catch (error: any) {
        respondServerError({ res, message: error.name,  error: error.message })

    }
}

/**
 * Returns all token exclude records for debugging JWT refresh logic.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.query()

        return respondOk({ res, payload: {users} })
    } catch (error: any) {
        respondServerError({ res, message: error.name,  error: error.message })

    }
}
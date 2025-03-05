import { Request, Response } from 'express'

import { respondConflict, respondNotFound, respondOk, respondServerError, respondUnauthenticated } from '../utils/responses'

import User from '../models/User'

import { createAccessToken, createRefreshToken } from '../security/token'
import { getHashedPassword, verifyHashedPassword } from '../security/hash'
import { IUserRequest } from '../types/Auth.types'

const representUser = (user: any) => {
    return {
        id: user.id,
        created_on: user.createdOn,
        updated_on: user.updatedOn,
        username: user.username,
        display_name: user.displayName,
        languages: user.languages,
        default_lang: user.defaultLang,
        currencies: user.currencies,
        default_currency: user.defaultCurrency,
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const checkExisting = await User.query().where('username', '=', req.body.username)

        if (checkExisting.length > 0) {
            return respondConflict(req, res, null, 'The username requested is already taken.')
        }

        const now = new Date().toISOString()
        const hashedPassword = await getHashedPassword(req.body.password)
        const body = {
            languages: 'en-GB',
            defaultLang: 'en-GB',
            currencies: 'GBP',
            defaultCurrency: 'GBP', 
            ...req.body,
            createdOn: now,
            updatedOn: now,
            password: hashedPassword,
        }
        
        const user = await User.query().insertAndFetch(body)
        const accessToken = createAccessToken(user.username)
        const refreshToken = createRefreshToken(user.username)

        return respondOk(req, res, { accessToken, refreshToken, user: representUser(user) })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await User.query().where('username', '=', req.body.username).first()

        if (!user) {
            return respondNotFound(req, res, null, `No found for username "${req.body.username}".`)
        }

        const verifyPassword = verifyHashedPassword(req.body.password, user.password)

        if (!verifyPassword) {
            return respondUnauthenticated(req, res, null, 'Username of password is not correct.', 401, 'Not logged in')
        }

        const accessToken = createAccessToken(user.username)
        const refreshToken = createRefreshToken(user.username)

        return respondOk(req, res, { accessToken, refreshToken })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const getUserExists = async (req: Request, res: Response) => {
    try {
        const user = await User.query().where('username', '=', req.params.username).first()

        if (user) {
            return respondOk(req, res, { exists: true })
        }

        return respondOk(req, res, { exists: false })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const getUserDetails = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query().where('username', '=', req.user.sub).first()
        return respondOk(req, res, { user: user ? representUser(user) : undefined })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

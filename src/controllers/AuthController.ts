import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { respondConflict, respondNotFound, respondOk, respondServerError, respondUnauthenticated } from '../utils/responses'

import User from '../models/User'
import TokenExclude from '../models/TokenExclude'

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
        const checkExisting = await User.query().where('username', 'LIKE', `${req.body.username.toLowerCase()}`)

        if (checkExisting.length > 0) {
            return respondConflict(req, res, null, 'The username requested is already taken.')
        }

        const hashedPassword = await getHashedPassword(req.body.password)
        const now = new Date().toISOString()
        const body = {
            languages: 'en-GB',
            defaultLang: 'en-GB',
            currencies: 'GBP',
            defaultCurrency: 'GBP', 
            ...req.body,
            createdOn: now,
            updatedOn: now,
            username: req.body.username.toLowerCase(),
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
        const user = await User.query().where('username', 'LIKE', `${req.body.username.toLowerCase()}`).first()

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
        const user = await User.query().where('username', 'LIKE', `${req.params.username.toLowerCase()}`).first()

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
        const user = await User.query().where('username', 'LIKE', `${req.user.sub}`).first()
        return respondOk(req, res, { user: user ? representUser(user) : undefined })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.body.refreshToken

        if (!token) {
            throw new Error('No refresh token provided in request.')
        }
        
        const JWT_SECRET = process.env.JWT_SECRET || ''
        const decodedToken = jwt.verify(token, JWT_SECRET)
        
        if (typeof decodedToken === 'string' || !decodedToken?.jti || !decodedToken.sub) {
            throw new Error ('Unable to decode access token, token type is invalid.')
        }
        
        const excludeRecord = await TokenExclude.query().where('jti', '=', decodedToken.jti).first()

        if (excludeRecord) {
            return respondUnauthenticated(req, res, null, 'Refresh token has already been used.', 401, 'Token Revoked')
        }
        
        const body = {
            jti: decodedToken.jti,
            expires: new Date(decodedToken.exp|| new Date()).getTime(),
        }
        await TokenExclude.query().insert(body)

        const accessToken = createAccessToken(decodedToken.sub)
        const refreshToken = createRefreshToken(decodedToken.sub)

        return respondOk(req, res, { accessToken, refreshToken })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}
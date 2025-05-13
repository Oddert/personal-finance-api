import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

import { IUserRequest } from '../types/Auth.types'

import { respondConflict, respondNotFound, respondOk, respondServerError, respondUnauthenticated } from '../utils/responses'

import User from '../models/User'
import TokenExclude from '../models/TokenExclude'

import { createAccessToken, createRefreshToken } from '../security/token'
import { getHashedPassword, verifyHashedPassword } from '../security/hash'

export const registerUser = async (req: IUserRequest, res: Response) => {
    try {
        const checkExisting = await User.query().where('username', 'LIKE', `${req.body.username.toLowerCase()}`)

        if (checkExisting.length > 0) {
            return respondConflict({ req, res, message: req.t('auth.messages.usernameTaken') })
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
            id: uuid(),
        }
        
        const user = await User.query().insertAndFetch(body)
        const accessToken = createAccessToken(user.username)
        const refreshToken = createRefreshToken(user.username)

        return respondOk({ req, res, payload: { accessToken, refreshToken, user: user.toJson() } })
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message })
    }
}

export const loginUser = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query()
            .where('username', 'LIKE', `${req.body.username.toLowerCase()}`)
            .first()

        if (!user) {
            return respondNotFound({
                req,
                res,
                message: req.t(
                    'auth.messages.noUserForName',
                    { username: req.body.username },
                )
            })
        }

        const verifyPassword = verifyHashedPassword(req.body.password, user.password)

        if (!verifyPassword) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('auth.messsages.usernameOrPasswordWrong'),
            })
        }

        const accessToken = createAccessToken(user.username)
        const refreshToken = createRefreshToken(user.username)

        return respondOk({ req, res, payload: { accessToken, refreshToken } })
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message })
    }
}

export const getUserExists = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query().where('username', 'LIKE', `${req.params.username.toLowerCase()}`).first()

        if (user) {
            return respondOk({ req, res, payload: { exists: true } })
        }

        return respondOk({ req, res, payload: { exists: false } })
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message })
    }
}

export const getUserDetails = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query().where('username', 'LIKE', `${req.user.username}`).first()
        return respondOk({ req, res, payload: { user: user ? user.toJson() : undefined } })
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message })
    }
}

export const refreshToken = async (req: IUserRequest, res: Response) => {
    try {
        const token = req.body.refreshToken

        if (!token) {
            throw new Error(req.t('auth.messages.noRefreshToken'))
        }
        
        const JWT_SECRET = process.env.JWT_SECRET || ''
        const decodedToken = jwt.verify(token, JWT_SECRET)
        
        if (typeof decodedToken === 'string' || !decodedToken?.jti || !decodedToken.sub) {
            throw new Error (req.t('securityErrors.unableToDecodeAccessToken'))
        }
        
        const excludeRecord = await TokenExclude.query().where('jti', '=', decodedToken.jti).first()

        if (excludeRecord) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('securityMessages.refreshTokenUsed'),
                error: req.t('securityErrors.tokenRevoked'),
            })
        }
        
        const body = {
            jti: decodedToken.jti,
            expires: new Date(decodedToken.exp|| new Date()).getTime(),
        }
        await TokenExclude.query().insert(body)

        const accessToken = createAccessToken(decodedToken.sub)
        const refreshToken = createRefreshToken(decodedToken.sub)

        return respondOk({ req, res, payload: { accessToken, refreshToken } })
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message })
    }
}
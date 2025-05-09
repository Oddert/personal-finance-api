import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { IUserRequest } from '../types/Auth.types'

import { respondUnauthenticated } from '../utils/responses'
import TokenExclude from '../models/TokenExclude'
import User from '../models/User'

/**
 * Middleware to protect routes requiring authorisation.
 *
 * Enforces that users must have a valid Bearer token Authorisation header in requests.
 */
export const requiresAuth = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return respondUnauthenticated({
            res,
            message: 'Your logged in has expired, please login and try again.',
            error: 'No "Authorization" header found in request.',
        })
    }
    
    const token = authHeader.split(' ')
    
    if (token.length !== 2) {
        return respondUnauthenticated({
            res,
            message: 'Your logged in has expired, please login and try again.',
            error: '"Authorization" header in request is malformed.',
        })
    }
    
    try {
        const JWT_SECRET = process.env.JWT_SECRET || ''
        const decodedToken = jwt.verify(token[1], JWT_SECRET)

        if (typeof decodedToken === 'string') {
            throw new Error ('Unable to decode access token, token type is invalid.')
        }
        
        if (!decodedToken?.exp || decodedToken.exp <= new Date().getTime()) {
            return respondUnauthenticated({ res, message: 'Access token has expired.', error: 'Token Expired' })
        }

        if (!decodedToken.jti) {
            throw new Error('Token format is invalid, the key "jti" is missing.')
        }

        if (!decodedToken.sub) {
            throw new Error('Token format is invalid, the key "sub" is missing.')
        }

        const excludeRecord = await TokenExclude.query().where('jti', '=', decodedToken.jti).first()

        if (excludeRecord) {
            return respondUnauthenticated({ res, message: 'Access token has already been used.', error: 'Token Revoked' })
        }

        const user = await User.query().where('username', '=', decodedToken.sub).first()

        req.user = user?.toJson()
        next()
    } catch (error: any) {
        return respondUnauthenticated({
            res,
            message: 'Your logged in has expired, please login and try again.',
            error: error?.message || '"Authorization" token is invalid.',
        })
    }
}

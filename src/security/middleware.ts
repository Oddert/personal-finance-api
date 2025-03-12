import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { IUserRequest } from '../types/Auth.types'

import { respondUnauthenticated } from '../utils/responses'
import TokenExclude from '../models/TokenExclude'

/**
 * Middleware to protect routes requiring authorisation.
 *
 * Enforces that users must have a valid Bearer token Authorisation header in requests.
 */
export const requiresAuth = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return respondUnauthenticated(
            req,
            res,
            null,
            'Your logged in has expired, please login and try again.',
            401,
            'No Authorization header found in request.',
        )
    }
    
    const token = authHeader.split(' ')
    
    if (token.length !== 2) {
        return respondUnauthenticated(
            req,
            res,
            null,
            'Your logged in has expired, please login and try again.',
            401,
            'Authorization header in request is malformed.',
        )
    }
    
    try {
        const JWT_SECRET = process.env.JWT_SECRET || ''
        const decodedToken = jwt.verify(token[1], JWT_SECRET)

        if (typeof decodedToken === 'string') {
            console.info(decodedToken)
            throw new Error ('Unable to decode access token, token type is invalid.')
        }
        
        if (!decodedToken?.exp || decodedToken.exp <= new Date().getTime()) {
            throw new Error ('Access token has expired.')
        }

        if (!decodedToken.jti) {
            throw new Error('Token format is invalid, jti is missing.')
        }

        const excludeRecord = await TokenExclude.query().findById(decodedToken.jti)

        if (excludeRecord) {
            throw new Error('Token has been revoked.')
        }

        req.user = decodedToken
        next()
    } catch (error: any) {
        return respondUnauthenticated(
            req,
            res,
            null,
            'Your logged in has expired, please login and try again.',
            401,
            error?.message || 'Authorization token is invalid.',
        )
    }
}
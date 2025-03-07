import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { IUserRequest } from '../types/Auth.types'

import { respondUnauthenticated } from '../utils/responses'

/**
 * Middleware to protect routes requiring authorisation.
 *
 * Enforces that users must have a valid Bearer token Authorisation header in requests.
 */
export const requiresAuth = (req: IUserRequest, res: Response, next: NextFunction) => {
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
            throw new Error ('Unable to decode access token, token type is invalid.')
        }
        
        if (!decodedToken?.exp || decodedToken.exp <= new Date().getTime()) {
            throw new Error ('Access token has expired.')
        }

        req.user = decodedToken
        next()
    } catch (error) {
        return respondUnauthenticated(
            req,
            res,
            null,
            'Your logged in has expired, please login and try again.',
            401,
            'Authorization token is invalid.',
        )
    }
}
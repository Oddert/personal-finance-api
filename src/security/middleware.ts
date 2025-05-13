import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IUserRequest } from '../types/Auth.types';

import { respondUnauthenticated } from '../utils/responses';

import TokenExclude from '../models/TokenExclude';
import User from '../models/User';

/**
 * Middleware to protect routes requiring authorisation.
 *
 * Enforces that users must have a valid Bearer token Authorisation header in requests.
 */
export const requiresAuth = async (
    req: IUserRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return respondUnauthenticated({
            req,
            res,
            message: req.t('securityMessages.loginExpired'),
            error: req.t('securityErrors.noAuthHeader'),
        });
    }

    const token = authHeader.split(' ');

    if (token.length !== 2) {
        return respondUnauthenticated({
            req,
            res,
            message: req.t('securityMessages.loginExpired'),
            error: req.t('securityErrors.authHeaderMalformed'),
        });
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET || '';
        const decodedToken = jwt.verify(token[1], JWT_SECRET);

        if (typeof decodedToken === 'string') {
            throw new Error(req.t('securityErrors.unableToDecodeAccessToken'));
        }

        if (!decodedToken?.exp || decodedToken.exp <= new Date().getTime()) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('securityMessages.accessTokenExpired'),
                error: req.t('securityErrors.tokenExpired'),
            });
        }

        if (!decodedToken.jti) {
            throw new Error(req.t('securityErrors.jtiMalformed'));
        }

        if (!decodedToken.sub) {
            throw new Error(req.t('securityErrors.subMalformed'));
        }

        const excludeRecord = await TokenExclude.query()
            .where('jti', '=', decodedToken.jti)
            .first();

        if (excludeRecord) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('securityMessages.accessTokenUsed'),
                error: req.t('securityErrors.tokenRevoked'),
            });
        }

        const user = await User.query()
            .where('username', '=', decodedToken.sub)
            .first();

        req.user = user?.toJson();
        next();
    } catch (error: any) {
        return respondUnauthenticated({
            req,
            res,
            message: req.t('securityMessages.loginExpired'),
            error:
                error?.message || req.t('securityErrors.authHeaderMalformed'),
        });
    }
};

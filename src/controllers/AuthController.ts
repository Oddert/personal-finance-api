/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { IUserRequest } from '../types/Auth.types';

import {
    respondBadRequest,
    respondConflict,
    respondNotFound,
    respondOk,
    respondServerError,
    respondUnauthenticated,
} from '../utils/responses';

import User from '../models/User';
import TokenExclude from '../models/TokenExclude';

import { createAccessToken, createRefreshToken } from '../security/token';
import { getHashedPassword, verifyHashedPassword } from '../security/hash';

/**
 * Creates a single new user, first checking the username is not taken.
 */
export const registerUser = async (req: IUserRequest, res: Response) => {
    try {
        const checkExisting = await User.query().where(
            'username',
            'LIKE',
            `${req.body.username.toLowerCase()}`,
        );

        if (checkExisting.length > 0) {
            return respondConflict({
                req,
                res,
                message: req.t('auth.messages.usernameTaken'),
            });
        }

        const hashedPassword = await getHashedPassword(req.body.password);
        const now = new Date().toISOString();
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
        };

        const user = await User.query().insertAndFetch(body);
        const accessToken = createAccessToken(user.username);
        const refreshToken = createRefreshToken(user.username);

        return respondOk({
            req,
            res,
            payload: { accessToken, refreshToken, user: user.toJson() },
        });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Logs-in an existing user, issuing an access JTW and a refresh token.
 */
export const loginUser = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query()
            .where('username', 'LIKE', `${req.body.username.toLowerCase()}`)
            .first();

        if (!user) {
            return respondNotFound({
                req,
                res,
                message: req.t('auth.messages.noUserForName', {
                    email: req.body.username,
                }),
            });
        }

        const verifyPassword = verifyHashedPassword(
            req.body.password,
            user.password,
        );

        if (!verifyPassword) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('auth.messsages.usernameOrPasswordWrong'),
            });
        }

        const accessToken = createAccessToken(user.username);
        const refreshToken = createRefreshToken(user.username);

        return respondOk({ req, res, payload: { accessToken, refreshToken } });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Utility endpoint to check if a username is available.
 */
export const getUserExists = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query()
            .where('username', 'LIKE', `${req.params.username.toLowerCase()}`)
            .first();

        if (user) {
            return respondOk({ req, res, payload: { exists: true } });
        }

        return respondOk({ req, res, payload: { exists: false } });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Retrieves full user details for an authenticated user.
 */
export const getUserDetails = async (req: IUserRequest, res: Response) => {
    try {
        const user = await User.query()
            .where('username', 'LIKE', `${req.user.username}`)
            .first();
        return respondOk({
            req,
            res,
            payload: { user: user ? user.toJson() : undefined },
        });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Token refresh endpoint. Consumes a refresh token and issues a new access and refresh JWT.
 */
export const refreshUserAuthToken = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const token = req.body.refreshToken;

        if (!token) {
            throw new Error(req.t('auth.messages.noRefreshToken'));
        }

        const JWT_SECRET = process.env.JWT_SECRET || '';
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if (
            typeof decodedToken === 'string' ||
            !decodedToken?.jti ||
            !decodedToken.sub
        ) {
            throw new Error(req.t('securityErrors.unableToDecodeAccessToken'));
        }

        const user = await User.query()
            .where('username', '=', decodedToken.sub)
            .first();

        if (!user) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('auth.messages.noUserForName', {
                    email: decodedToken.sub,
                }),
                error: req.t('securityErrors.tokenExpired'),
            });
        }

        const excludeRecord = await TokenExclude.query()
            .where('jti', '=', decodedToken.jti)
            .first();

        if (excludeRecord) {
            return respondUnauthenticated({
                req,
                res,
                message: req.t('securityMessages.refreshTokenUsed'),
                error: req.t('securityErrors.tokenRevoked'),
            });
        }

        const body = {
            jti: decodedToken.jti,
            expires: new Date(decodedToken.exp || new Date()).getTime(),
        };
        await TokenExclude.query().insert(body);

        const accessToken = createAccessToken(decodedToken.sub);
        const refreshToken = createRefreshToken(decodedToken.sub);

        return respondOk({
            req,
            res,
            payload: { accessToken, refreshToken, user: user.toJson() },
        });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Allows the user to change non-security related details.
 */
export const updateUserDetails = async (req: IUserRequest, res: Response) => {
    try {
        const queriedUser = await User.query()
            .where('username', '=', req.user.username)
            .first();

        if (!queriedUser) {
            return respondNotFound({
                req,
                res,
                message: req.t('auth.messages.noUserForName', {
                    email: req.user.username,
                }),
            });
        }

        const updatedUser = await User.query().patchAndFetchById(
            queriedUser.id,
            {
                first_name: req.body.firstName || queriedUser.first_name,
                last_name: req.body.lastName || queriedUser.last_name,
                languages: req.body.languages || queriedUser.languages,
                default_lang: req.body.defaultLang || queriedUser.default_lang,
                currencies: req.body.currencies || queriedUser.currencies,
                default_currency:
                    req.body.defaultCurrency || queriedUser.default_currency,
            },
        );

        return respondOk({ req, res, payload: { user: updatedUser.toJson() } });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Allows the user to change their password.
 */
export const changePassword = async (req: IUserRequest, res: Response) => {
    try {
        const queriedUser = await User.query()
            .where('username', '=', req.user.username)
            .first();

        if (!queriedUser) {
            return respondNotFound({
                req,
                res,
                message: req.t('auth.messages.noUserForName', {
                    email: req.user.username,
                }),
            });
        }

        console.log(req.body.oldPassword, queriedUser);

        const oldPasswordCompare = await verifyHashedPassword(
            req.body.oldPassword,
            queriedUser.password,
        );

        if (!oldPasswordCompare) {
            return respondBadRequest({
                req,
                res,
                message: req.t('securityMessages.oldPasswordDoesNotMatch'),
                error: req.t('securityErrors.incorrectPassword'),
            });
        }

        const password = await getHashedPassword(req.body.newPassword);
        const updatedUser = await User.query().patchAndFetchById(
            queriedUser.id,
            { password },
        );

        const accessToken = createAccessToken(updatedUser.username);
        const refreshToken = createRefreshToken(updatedUser.username);

        console.log(updatedUser);

        return respondOk({
            req,
            res,
            payload: { accessToken, refreshToken, user: updatedUser.toJson() },
        });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

/**
 * Allows the user to change their email (username).
 */
export const changeEmail = async (req: IUserRequest, res: Response) => {
    try {
        const queriedUser = await User.query()
            .where('username', '=', req.user.username)
            .first();

        if (!queriedUser) {
            return respondNotFound({
                req,
                res,
                message: req.t('auth.messages.noUserForName', {
                    email: req.user.username,
                }),
            });
        }

        const updatedUser = await User.query().patchAndFetchById(
            queriedUser.id,
            { username: req.body.newEmail },
        );

        const accessToken = createAccessToken(updatedUser.username);
        const refreshToken = createRefreshToken(updatedUser.username);

        return respondOk({
            req,
            res,
            payload: { accessToken, refreshToken, user: updatedUser.toJson() },
        });
    } catch (error: any) {
        return respondServerError({ req, res, error: error.message });
    }
};

import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

import { v4 as uuid } from 'uuid'

/**
 * Creates an Access Token for a user.
 *
 * Performs no user validation, user authentication must be performed elsewhere.
 * @param username The user's username.
 * @param expiresDelta Optionally override the expiry time in minutes.
 * @returns The user's Access Token
 */
export const createAccessToken = (username: string, expiresDelta?: number) => {
    const JWT_SECRET = process.env.JWT_SECRET || ''
    const JWT_ACCESS_DEFAULT_EXPIRES = Number(process.env.JWT_ACCESS_DEFAULT_EXPIRES) || 30

    const expiresIn = dayjs()
        .add(expiresDelta ? expiresDelta : JWT_ACCESS_DEFAULT_EXPIRES, 'minutes')
        .valueOf()
    
    const token = jwt.sign(
        { exp: expiresIn, sub: username, jti: String(uuid()) },
        JWT_SECRET,
    )
    
    return token
}

/**
 * Creates a Refresh Token for a user.
 *
 * Performs no user validation, user authentication must be performed elsewhere.
 * @param username The user's username.
 * @param expiresDelta Optionally override the expiry time in minutes.
 * @returns The user's Refresh Token
 */
export const createRefreshToken = (username: string, expiresDelta?: number) => {
    const JWT_SECRET = process.env.JWT_SECRET || ''
    const JWT_REFRESH_DEFAULT_EXPIRES = Number(process.env.JWT_REFRESH_DEFAULT_EXPIRES) || 1080 // 7 days

    const expiresIn = dayjs()
        .add(expiresDelta ? expiresDelta : JWT_REFRESH_DEFAULT_EXPIRES, 'minutes')
        .valueOf()

    const token = jwt.sign(
        { exp: expiresIn, sub: username, jti: String(uuid()) },
        JWT_SECRET,
    )

    return token
}

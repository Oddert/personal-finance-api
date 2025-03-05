import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

/**
 * Creates an Access Token for a user.
 *
 * Performs no user validation, user authentication must be performed elsewhere.
 * @param username The user's username.
 * @param expiresDelta Optionally override the expiry time in days.
 * @returns The user's Access Token
 */
export const createAccessToken = (username: string, expiresDelta?: number) => {
    const JWT_SECRET = process.env.JWT_SECRET || ''
    const JWT_ACCESS_DEFAULT_EXPIRES = Number(process.env.JWT_ACCESS_DEFAULT_EXPIRES) || 1

    const expiresIn = dayjs()
        .add(expiresDelta ? expiresDelta : JWT_ACCESS_DEFAULT_EXPIRES, 'day')
        .valueOf()
    
    const token = jwt.sign(
        { exp: expiresIn, sub: username },
        JWT_SECRET,
    )
    
    return token
}

/**
 * Creates a Refresh Token for a user.
 *
 * Performs no user validation, user authentication must be performed elsewhere.
 * @param username The user's username.
 * @param expiresDelta Optionally override the expiry time in days.
 * @returns The user's Refresh Token
 */
export const createRefreshToken = (username: string, expiresDelta?: number) => {
    const JWT_SECRET = process.env.JWT_SECRET || ''
    const JWT_REFRESH_DEFAULT_EXPIRES = Number(process.env.JWT_REFRESH_DEFAULT_EXPIRES)

    const expiresIn = dayjs()
        .add(expiresDelta ? expiresDelta : JWT_REFRESH_DEFAULT_EXPIRES, 'day')
        .valueOf()

    const token = jwt.sign(
        { exp: expiresIn, sub: username },
        JWT_SECRET,
    )

    return token
}

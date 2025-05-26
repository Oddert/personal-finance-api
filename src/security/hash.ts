import bcrypt from 'bcryptjs';

/**
 * Hashes a password for saving to th database.
 * @param password THe plain-text password to encode.
 * @returns The hashed result.
 */
export const getHashedPassword = (password: string) => {
    return bcrypt.hash(password, 10);
};

/**
 * Compares a user-submitted password to a password retrieved from the database to determine if it is correct.
 * @param password THe incoming password.
 * @param hashedPassword The retrieved password hash to compare to.
 * @returns The comparison result.
 */
export const verifyHashedPassword = (
    password: string,
    hashedPassword: string,
) => {
    if (!password || !hashedPassword) {
        throw new Error(
            'Either incoming password or stored password is undefined',
        );
    }
    return bcrypt.compare(password, hashedPassword);
};

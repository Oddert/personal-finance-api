import { getHashedPassword } from '../security/hash';

export const getTestUser = () => {
    const user = {
        id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
        created_on: new Date(),
        updated_on: new Date(),
        username: 'sample@example.com',
        password: getHashedPassword('Password1'),
        first_name: 'Example',
        last_name: 'User',
        languages: 'en-GB, en-US',
        default_lang: 'en-GB',
        currencies: 'GBP',
        default_currency: 'GBP',
    };
    return user;
};

/**
 * Curried function which tests a value for null.
 *
 * Returns `true` if the item is null, otherwise returns the default value `other`.
 * @param other Default value to return.
 */
export const nullOr = (other: string) => (s: any) =>
    s === null || typeof s == other;

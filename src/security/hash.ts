import bcrypt from 'bcryptjs';

export const getHashedPassword = (password: string) => {
    return bcrypt.hash(password, 10);
};

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

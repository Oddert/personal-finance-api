import { Schema } from 'express-validator'

export const logInSchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'>  = {
    username: {
        isString: true,
        exists: { errorMessage: 'Missing field "username" is required.' },
        errorMessage: 'Field "username" is invalid. Please ensure it is a string of at least 3 characters long.',
        isLength: {
            errorMessage: 'Field "username" must be at least 3 characters long and no longer than 100 characters.',
            options: {
                min: 3,
                max: 100,
            }
        },
    },
    password: {
        isString: true,
        exists: { errorMessage: 'Missing field "password" is required.' },
        errorMessage: 'Field "password" is invalid. Please ensure it is a string of at least 3 characters long.',
        isLength: {
            errorMessage: 'Field "password" must be at least 3 characters long.',
            options: {
                min: 3,
            }
        },
    },
}

export const signUpSchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'>  = {
    ...logInSchema,
    firstName: {
        isString: true,
        exists: { errorMessage: 'Missing field "firstName" is required.' },
        errorMessage: 'Field "firstName" is invalid. Please ensure it is a string of at least 3 characters long.',
        isLength: {
            errorMessage: 'Field "firstName" must be at least 3 characters long and no longer than 100 characters.',
            options: {
                min: 3,
                max: 100,
            }
        },
    },
    lastName: {
        isString: true,
        exists: { errorMessage: 'Missing field "lastName" is required.' },
        errorMessage: 'Field "lastName" is invalid. Please ensure it is a string of at least 3 characters long.',
        isLength: {
            errorMessage: 'Field "lastName" must be at least 3 characters long and no longer than 100 characters.',
            options: {
                min: 3,
                max: 100,
            }
        },
    },
    languages: {
        isString: true,
        exists: { errorMessage: 'Missing field "languages" is required.' },
        errorMessage: 'Field "languages" is invalid. Please ensure it is a string of at least 3 characters long.',
        isLength: {
            errorMessage: 'Field "languages" must be at least 3 characters long.',
            options: {
                min: 3,
            }
        },
    },
}

export const refreshTokenSchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'>  = {
    refreshToken: {
        isString: true,
        exists: { errorMessage: 'No refresh token provided.' },
        errorMessage: 'Field "refreshToken" is invalid. Please ensure it is a valid refresh JWT.',
        isLength: {
            errorMessage: 'Field "refreshToken" must be at least 150 characters long.',
            options: {
                min: 150,
            }
        },
    },
}

// export const userExistsSchema = query('username')
//     .isString()
//     .withMessage('Field "username" must consist of alpha-numeric characters only.')
//     .isLength({ min: 3 })
//     .withMessage('Field "username" must be at least 3 characters long.')
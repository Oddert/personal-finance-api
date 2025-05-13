import { Schema } from 'express-validator';

export const cardCreateSchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = {
    isDefault: {
        isBoolean: true,
        optional: true,
        errorMessage: 'Field "name" must be an optional boolean.',
    },
    cardName: {
        isString: true,
        exists: { errorMessage: 'Field "cardName" is required.' },
        errorMessage:
            'Field "cardName" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "cardName" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    cardType: {
        isString: true,
        exists: { errorMessage: 'Field "cardType" is required.' },
        errorMessage:
            'Field "cardType" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "cardType" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    bankName: {
        isString: true,
        exists: { errorMessage: 'Field "bankName" is required.' },
        errorMessage:
            'Field "bankName" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "bankName" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    sortCode: {
        isNumeric: true,
        exists: { errorMessage: 'Field "cardNumber" is required.' },
        errorMessage:
            'Field "cardNumber" is invalid. Please ensure it is a positive number.',
        isLength: {
            errorMessage: 'Field "cardNumber" must not be negative.',
            options: {
                min: 0,
            },
        },
    },
    cardNumber: {
        isNumeric: true,
        exists: { errorMessage: 'Field "cardNumber" is required.' },
        errorMessage:
            'Field "cardNumber" is invalid. Please ensure it is a positive number.',
        isLength: {
            errorMessage: 'Field "cardNumber" must not be negative.',
            options: {
                min: 0,
            },
        },
    },
    expires: {
        isDate: true,
        errorMessage:
            'Field "expires" is invalid. Please insure it is a valid date.',
        exists: { errorMessage: 'Field "expires" is required.' },
    },
    description: {
        isString: true,
        optional: true,
    },
    icon: {
        isString: true,
        optional: true,
    },
    coverImage: {
        isString: true,
        optional: true,
    },
};

export const cardUpdateSchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = {
    ...cardCreateSchema,
    cardName: {
        ...cardCreateSchema.cardName,
        optional: true,
    },
    cardType: {
        ...cardCreateSchema.cardType,
        optional: true,
    },
    bankName: {
        ...cardCreateSchema.bankName,
        optional: true,
    },
    sortCode: {
        ...cardCreateSchema.sortCode,
        optional: true,
    },
    cardNumber: {
        ...cardCreateSchema.cardNumber,
        optional: true,
    },
    expires: {
        ...cardCreateSchema.expires,
        optional: true,
    },
};

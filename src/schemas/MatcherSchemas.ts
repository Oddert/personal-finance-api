import { Schema } from 'express-validator';

export const createMatcherSchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = {
    match: {
        isString: true,
        exists: { errorMessage: 'Field "match" is required.' },
        errorMessage:
            '"match" is invalid. Please ensure match is a string of at least 3 characters.',
        isLength: {
            options: {
                min: 3,
            },
        },
    },
    matchType: {
        isString: true,
        exists: { errorMessage: 'Field "matchType" is required.' },
        errorMessage:
            '"matchType" is invalid. Please ensure matchType is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "matchType" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    caseSensitive: {
        exists: { errorMessage: 'Field "caseSensitive" is required.' },
        errorMessage:
            '"caseSensitive" is invalid. Please ensure caseSensitive is a boolean value.',
        isIn: {
            errorMessage:
                '"caseSensitive" is invalid. Please ensure caseSensitive is a boolean value.',
            options: [true, false, 1, 0],
        },
    },
};

export const updateMatcherSchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = { ...createMatcherSchema };

export const createManyMatchersSchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = {
    'matchers.*.match': {
        isString: true,
        exists: { errorMessage: 'Field "match" is required.' },
        errorMessage:
            '"match" is invalid. Please ensure match is a string of at least 3 characters.',
        isLength: {
            options: {
                min: 3,
            },
        },
    },
    'matchers.*.matchType': {
        isString: true,
        exists: { errorMessage: 'Field "matchType" is required.' },
        errorMessage:
            '"matchType" is invalid. Please ensure matchType is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "matchType" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    'matchers.*.caseSensitive': {
        exists: { errorMessage: 'Field "caseSensitive" is required.' },
        errorMessage:
            '"caseSensitive" is invalid. Please ensure caseSensitive is a boolean value.',
        isIn: {
            errorMessage:
                '"caseSensitive" is invalid. Please ensure caseSensitive is a boolean value.',
            options: [true, false, 1, 0],
        },
    },
};

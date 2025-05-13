import { Schema } from 'express-validator';

export const createCategorySchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = {
    label: {
        isString: true,
        exists: { errorMessage: 'Field "label" is required.' },
        errorMessage:
            '"label" is invalid. Please ensure match is a string of at least 3 characters.',
        isLength: {
            options: {
                min: 3,
            },
        },
    },
    description: {
        isString: true,
        optional: true,
        errorMessage:
            '"description" is invalid. Please ensure description is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "description" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    colour: {
        isString: true,
        exists: { errorMessage: 'Field "colour" is required.' },
        errorMessage:
            '"colour" is invalid. Please ensure match is a string of at least 3 characters.',
        isLength: {
            options: {
                min: 3,
            },
        },
    },
};

export const updateCategorySchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = { ...createCategorySchema };

export const createManyCategoriesSchema: Schema<
    'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'
> = {
    'categories.*.label': {
        isString: true,
        exists: { errorMessage: 'Field "label" is required.' },
        errorMessage:
            '"label" is invalid. Please ensure match is a string of at least 3 characters.',
        isLength: {
            options: {
                min: 3,
            },
        },
    },
    'categories.*.description': {
        isString: true,
        optional: true,
        errorMessage:
            '"description" is invalid. Please ensure description is a string of at least 3 characters.',
        isLength: {
            errorMessage:
                'Length error. "description" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    'categories.*.colour': {
        isString: true,
        exists: { errorMessage: 'Field "colour" is required.' },
        errorMessage:
            '"colour" is invalid. Please ensure match is a string of at least 3 characters.',
        isLength: {
            options: {
                min: 3,
            },
        },
    },
};

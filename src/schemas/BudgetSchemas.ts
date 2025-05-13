import { Schema } from 'express-validator'

export const budgetCreateSchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'> = {
    name: {
        isString: true,
        exists: { errorMessage: 'Field "name" is required.' },
        errorMessage: 'Field "name" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "name" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    shortDescription: {
        isString: true,
        exists: { errorMessage: 'Field "shortDescription" is required.' },
        errorMessage: 'Field "shortDescription" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "shortDescription" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    longDescription: {
        isString: true,
        exists: { errorMessage: 'Field "longDescription" is required.' },
        errorMessage: 'Field "longDescription" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "longDescription" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    cardId: {
        isString: true,
        exists: { errorMessage: 'Field "cardId" is required.' },
        errorMessage: 'Field "cardId" is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "cardId" must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    'budgetRows.*.categoryId': {
        isString: true,
        exists: { errorMessage: 'Field "categoryId" is required.' },
        errorMessage: 'Field "categoryId" is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "categoryId" must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    'budgetRows.*.colour': {
        isString: true,
        exists: { errorMessage: 'Field "colour" on Budget Row is required.' },
        errorMessage: 'Field "colour" on Budget Row is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. Budget Row "colour" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    'budgetRows.*.label': {
        isString: true,
        exists: { errorMessage: 'Field "label" on Budget Row is required.' },
        errorMessage: 'Field "label" on Budget Row is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. Budget Row "label" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    'budgetRows.*.value': {
        isNumeric: true,
        exists: { errorMessage: 'Field "value" on Budget Row is required.' },
    },
    'budgetRows.*.varLowPc': {
        isNumeric: true,
        exists: { errorMessage: 'Field "varLowPc" on Budget Row is required.' },
    },
    'budgetRows.*.varHighPc': {
        isNumeric: true,
        exists: { errorMessage: 'Field "varHighPc" on Budget Row is required.' },
    },
}

export const budgetUpdateSchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'> = {
    id: {
        isString: true,
        exists: { errorMessage: 'Field "id" is required.' },
        errorMessage: 'Field "id" is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "id" must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    name: {
        ...budgetCreateSchema.name,
        optional: true,
    },
    shortDescription: {
        ...budgetCreateSchema.shortDescription,
        optional: true,
    },
    longDescription: {
        ...budgetCreateSchema.longDescription,
        optional: true,
    },
    cardId: {
        ...budgetCreateSchema.cardId,
        optional: true,
    },
    'budgetRows.*.id': {
        isString: true,
        exists: { errorMessage: 'Field "id" on Budget Row is required.' },
        errorMessage: 'Field "id" on Budget Row is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "id" on Budget Row must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    'budgetRows.*.categoryId': {
        ...budgetCreateSchema['budgetRows.*.categoryId'],
        optional: true,
    },
    'budgetRows.*.colour': {
        ...budgetCreateSchema['budgetRows.*.colour'],
        optional: true,
    },
    'budgetRows.*.label': {
        ...budgetCreateSchema['budgetRows.*.label'],
        optional: true,
    },
    'budgetRows.*.value': {
        ...budgetCreateSchema['budgetRows.*.value'],
        optional: true,
    },
    'budgetRows.*.varLowPc': {
        ...budgetCreateSchema['budgetRows.*.varLowPc'],
        optional: true,
    },
    'budgetRows.*.varHighPc': {
        ...budgetCreateSchema['budgetRows.*.varHighPc'],
        optional: true,
    },
}

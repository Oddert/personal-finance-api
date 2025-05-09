import { Schema } from 'express-validator'

export const scenarioCreateSchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'> = {
    user_id: {
        isString: true,
        exists: { errorMessage: 'Field "user_id" is required.' },
        errorMessage: 'Field "user_id" is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "user_id" must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    card_id: {
        isString: true,
        exists: { errorMessage: 'Field "card_id" is required.' },
        errorMessage: 'Field "card_id" is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "card_id" must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    start_date: {
        isDate: true,
        errorMessage: 'Field of start_date is invalid. Please ensure it is a valid date.',
        exists: { errorMessage: 'Field "expires" is required.' },
    },
    end_date: {
        isDate: true,
        optional: true,
        errorMessage: 'Field of start_date is invalid. Please ensure it is a valid date.',
    },
    title: {
        isString: true,
        exists: { errorMessage: 'Field "title" is required.' },
        errorMessage: 'Field "title" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "title" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    description: {
        isString: true,
        exists: { errorMessage: 'Field "description" is required.' },
        errorMessage: 'Field "description" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "description" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    start_ballance: {
        isNumeric: true,
        exists: { errorMessage: 'Field "start_ballance" is required.' },
        errorMessage: 'Field "start_ballance" is invalid. Please ensure it is a number.',
    },
    'transactors.*.scenario_id': {
        isString: true,
        exists: { errorMessage: 'Field "scenario_id" on Transactor is required.' },
        errorMessage: 'Field "scenario_id" on Transactor is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "scenario_id" on Transactor must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    'transactors.*.description': {
        isString: true,
        exists: { errorMessage: 'Field "description" on Transactor  is required.' },
        errorMessage: 'Field "description" on Transactor  is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "description" on Transactor  must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    'transactors.*.value': {
        isNumeric: true,
        exists: { errorMessage: 'Field "value" on Transactor is required.' },
        errorMessage: 'Field "value" on Transactor is invalid. Please ensure it is a number.',
    },
    'transactors.*.is_addition': {
        isBoolean: true,
        optional: true,
        errorMessage: 'Field "is_addition" on Transactor must be an optional boolean.',
        exists: { errorMessage: 'Field "is_addition" on Transactor is required.' },
    },
    'transactors.*.schedulers.*.transactor_id': {
        isString: true,
        exists: { errorMessage: 'Field "scenario_id" on Transactor is required.' },
        errorMessage: 'Field "scenario_id" on Transactor is invalid. Please ensure it is a string of 36 characters.',
        isLength: {
            errorMessage: 'Length error. "scenario_id" on Transactor must be 36 characters long.',
            options: {
                min: 36,
                max: 36,
            },
        },
    },
    'transactors.*.schedulers.*.scheduler_code': {
        isString: true,
        exists: { errorMessage: 'Field "scheduler_code" is required.' },
        errorMessage: 'Field "scheduler_code" is invalid. Please ensure it is a string of at least 3 characters.',
        isLength: {
            errorMessage: 'Length error. "scheduler_code" must be at least 3 characters long.',
            options: {
                min: 3,
            },
        },
    },
    'transactors.*.schedulers.*.day': {
        isNumeric: true,
        exists: { errorMessage: 'Field "day" on Transactor is required.' },
        errorMessage: 'Field "day" on Transactor is invalid. Please ensure it is a number.',
        isLength: {
            errorMessage: 'Field "day" on Scheduler must be between 1 and 31.',
            options: {
                min: 1,
                max: 31,
            }
        }
    },
}

export const scenarioCreateManySchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'> = {
    'scenarios.*.user_id': {
        ...scenarioCreateSchema.user_id,
    },
    'scenarios.*.card_id': {
        ...scenarioCreateSchema.card_id,
    },
    'scenarios.*.start_date': {
        ...scenarioCreateSchema.start_date,
    },
    'scenarios.*.end_date': {
        ...scenarioCreateSchema.end_date,
    },
    'scenarios.*.title': {
        ...scenarioCreateSchema.title,
    },
    'scenarios.*.description': {
        ...scenarioCreateSchema.description,
    },
    'scenarios.*.start_ballance': {
        ...scenarioCreateSchema.start_ballance,
    },
    'scenarios.*.transactors.*.scenario_id': {
        ...scenarioCreateSchema['transactors.*.scenario_id'],
    },
    'scenarios.*.transactors.*.description': {
        ...scenarioCreateSchema['transactors.*.description'],
    },
    'scenarios.*.transactors.*.value': {
        ...scenarioCreateSchema['transactors.*.value'],
    },
    'scenarios.*.transactors.*.is_addition': {
        ...scenarioCreateSchema['transactors.*.is_addition'],
    },
    'scenarios.*.transactors.*.schedulers.*.transactor_id': {
        ...scenarioCreateSchema['transactors.*.schedulers.*.transactor_id'],
    },
    'scenarios.*.transactors.*.schedulers.*.scheduler_code': {
        ...scenarioCreateSchema['transactors.*.schedulers.*.scheduler_code'],
    },
    'scenarios.*.transactors.*.schedulers.*.day': {
        ...scenarioCreateSchema['transactors.*.schedulers.*.day'],
    },
}

export const scenarioDeleteManySchema: Schema<'exists' | 'isString' | 'isLength' | 'errorMessage' | 'optional'> = {
    scenarios: {
        isArray: true,
        isNumeric: true,
    }
}
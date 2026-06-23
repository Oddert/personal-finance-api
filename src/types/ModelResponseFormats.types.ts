// Types defined to describe the JSON format of a model.
// Used as a stopgap until Objection is replaced.
// Should match any types the front end application holds.

/**
 * A single budget row representing one category and its target value.
 * @category Global Types
 */
export interface IBudgetRow {
    id: string;
    categoryId: string;
    colour: string;
    label: string;
    value: number;
    varLowPc: number;
    varHighPc: number;
}

/**
 * A whole budget from the API service, including budget rows.
 * @category Global Types
 */
export interface IBudget {
    budgetRows: IBudgetRow[];
    cardId: string | null;
    createdOn: string;
    id: string;
    isDefault: boolean;
    longDescription: string;
    name: string;
    shortDescription: string;
    updatedOn: string;
}

export type ICardTypes = 'OTHER' | 'DEBIT' | 'CREDIT';

export interface ICard {
    id: string;
    isDefault: boolean;
    cardName: string;
    cardType: ICardTypes;
    bankName: string;
    sortCode: number;
    cardNumber: number;
    expires: number;
    description: string;
    icon: string;
    coverImage: string;
    createdOn: string;
    updatedOn: string;
}

/**
 * A single Category definition.
 * @category Global Types
 */
export interface ICategory {
    id: string;
    label: string;
    description: string;
    colour: string;
    created_on: string;
    updated_on: string;
    matchers: IMatcher[];
}

/**
 * Allowed string values for Matcher.
 * @category Global Types
 */
export type TMatchType = 'exact' | 'start' | 'end' | 'any';

/**
 * A Matcher, used to auto-match Categories to Transactions.
 * @category Global Types
 */
export interface IMatcher {
    id: string;
    match: string;
    match_type: TMatchType;
    case_sensitive: boolean;
    created_on: string;
    updated_on: string;
}

export interface IScenario {
    id: string;
    cardId: string;
    userId: string;
    startDate: string;
    endDate: string;
    createdOn: string;
    updatedOn: string;
    title: string;
    description: string;
    startBallance: number;
    transactors: ITransactor[];
}

export interface ITransactor {
    id: string;
    categoryId: string | null;
    cardId: string | null;
    createdOn: string;
    description: string;
    isAddition: boolean;
    scenarioId: string;
    schedulers: IScheduler[];
    updatedOn: string;
    value: number;
}

export interface IScheduler {
    id: string;
    createdOn: string;
    updatedOn: string;
    schedulerCode: TSchedulerCode;
    step: number | null;
    startDate: string | null;
    day: number;
    nthDay: number | null;
    transactorId: string;
}

export type TSchedulerCode = 'DAY' | 'SCALAR' | 'DAY_OF_WEEK' | 'EVENT';

/**
 * A single transaction.
 * @category Global Types
 */
export interface ITransaction {
    ballance: number;
    cardId: string | null;
    categoryId: string | null;
    createdOn: string;
    credit: number;
    currency: string | null;
    date: number;
    debit: number;
    description: string;
    id: string;
    transactionType: string;
    updatedOn: string;
    assignedCategory?: ICategory;
}

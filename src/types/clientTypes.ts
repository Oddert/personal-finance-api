/**
 * A single budget row representing one category and its target value.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientBudgetRow {
    /** The category assigned to this measure. */
    categoryId: string;
    /** CSS colour string for some display elements. */
    colour: string;
    /** Unique identifier. */
    id: string;
    /** User-readable category name. */
    label: string;
    /** The expected or target value. */
    value: number;
    /** Maximum percentage lower than the target which should be considered abnormal, notable, or undesirable. */
    varHighPc: number;
    /** Maximum percentage higher than the target which should be considered abnormal, notable, or undesirable. */
    varLowPc: number;
}

/**
 * A whole budget from the API service, including budget rows.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientBudget {
    /** The individual targets defined by a Category which set a target and variance range. */
    budgetRows: IClientBudgetRow[];
    /** Card / account associated with the Budget. Budget's are single-card only. */
    cardId: string | null;
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** Unique identifier. */
    id: string;
    /** True if the budget is selected by default. */
    isDefault: boolean;
    /** Longer description of the Budget shown on some pages. */
    longDescription: string;
    /** Title for the Budget. */
    name: string;
    /** Shorter summary description of the Budget. */
    shortDescription: string;
    /** ISO timestamp of most recent save. */
    updatedOn: string;
}

/**
 * Data structure used to represent one budget row with comparable aggregated category totals.
 *
 * Used as a standard chart data object throughout the budget page charts.
 * @category Types
 * @subcategory Client Types
 */
export interface IBudgetDatum {
    /** CSS colour string for some display elements. */
    colour: string;
    /** The ID of the category assigned to this measure. */
    categoryId: string;
    /** The display name of the category assigned to this measure. */
    categoryName: string;
    /** The expected / desired target value. */
    budget: number;
    /** The actual value spent. */
    spend: number;
    /** The difference in spend from the target value as a (float) number. */
    diffFloat: number;
    /** The difference in spend from the target value as a percentage. */
    diffPc: number;
    /** Percentage over / under spend for this Budget. */
    variance: [number, number];
}

export type IClientCardTypes = 'OTHER' | 'DEBIT' | 'CREDIT';

/**
 * Represents a single bank card, account, or other cash value store (e.g. a physical wallet).
 * @category Types
 * @subcategory Client Types
 */
export interface IClientCard {
    /** Name of the bank or wider organisation. */
    bankName: string;
    /** Readable card / account name. */
    cardName: string;
    /** The card number. */
    cardNumber: number;
    /** Card / account type. */
    cardType: IClientCardTypes;
    /** Card background image. */
    coverImage: string;
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** user-defined description of the card and its purpose. */
    description: string;
    /** ISO timestamp of the date of expiry. */
    expires: number;
    /** Small card icon. */
    icon: string;
    /** Unique identifier. */
    id: string;
    /** True if this Card is selected by default. */
    isDefault: boolean;
    /** The card sort code. */
    sortCode: number;
    /** ISO timestamp of most recent save. */
    updatedOn: string;
}

/**
 * Allowed string values for Matcher.
 * @category Types
 * @subcategory Client Types
 */
export type TClientMatchType = 'exact' | 'start' | 'end' | 'any';

/**
 * A Matcher, used to auto-match Categories to Transactions.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientMatcher {
    /** If true, the match should match case, ignore otherwise. */
    caseSensitive: boolean;
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** Unique identifier. */
    id: string;
    /** User-defined string to match using. */
    match: string;
    /** The type of match to use. Maps to regular expression logic. */
    matchType: TClientMatchType;
    /** ISO timestamp of most recent save. */
    updatedOn: string;
    /** ID of the user who owns this Category. */
    userId: string;
}

/**
 * A single Category definition for transactions to be mapped to.
 *
 * Defined by the user, Categories are used to group transactions by type, purpose, budget plan, etc.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientCategory {
    /** CSS colour string for some display elements. */
    colour: string;
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** user-defined description of the Category and its purpose. */
    description: string | null;
    /** Unique identifier. */
    id: string;
    /** The main Category title. */
    label: string;
    /** List of Matchers to use to try to auto-map Transactions to this Category. */
    matchers: IClientMatcher[];
    /** ISO timestamp of most recent save. */
    updatedOn: string;
    /** ID of the user who owns this Category. */
    userId: string;
}

/**
 * Constructor used to create time based events within a given time band.
 *
 * Used by the Scenario system, Schedulers can be invoked to define clusters of calendar events tied to an expected action.
 *
 * Scheduler behaviour differs depending on its type (`schedulerCode`), at any given time only some fields are used.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientScheduler {
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /**
     * Day of the week number from 0 - 6, representing Sunday - Saturday.
     *
     * Only applicable to some Schedulers.
     */
    day: number | null;
    /** Unique identifier. */
    id: string;
    /**
     * The day step representing what the repeat frequency of a schedule.
     *
     * Only applicable to some Schedulers.
     */
    nthDay: number | null;
    /** The type of scheduler logic to use. */
    schedulerCode: string;
    /**
     * Time in milliseconds which represents an interval for a repeat frequency.
     *
     * Only applicable to some Schedulers.
     */
    step: number | null;
    /**
     * The first date to trigger a schedule. Any frequency-based scheduler will anchor to this date.
     *
     * Only applicable to some Schedulers.
     */
    startDate: string | null;
    /** ID of the Transactor this Scheduler is attached to. */
    transactorId: string;
    /** ISO timestamp of most recent save. */
    updatedOn: string;
}

/**
 * Within the Scenario system, defines a specific expected one-off or repeatable action.
 *
 * A Transactor represents a single account action (income, outgoings, interest gained, etc.).
 *
 * Transactors use one or more Schedulers to define when their action should occur and on what pattern it should repeat.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientTransactor {
    /** The ID of the Category this action represents. */
    categoryId: string | null;
    /** The Card / Account this transactor applies to. */
    cardId: string | null;
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** The user-defined description of this action. */
    description: string | null;
    /** Unique identifier. */
    id: string;
    /** If true, the value of `value` will be added to the ballance on trigger, otherwise treated as a subtraction. */
    isAddition: boolean;
    /** The Scenario this row belongs to. */
    scenarioId: string;
    /** Joined list of Schedulers. Is not returned for some actions such as update. */
    schedulers?: IClientScheduler[];
    /** ISO timestamp of most recent save. */
    updatedOn: string;
    /** The value to add or subtract from the balance. */
    value: number;
}

/**
 * A connection from Scenario to Card to allow Scenario to track a starting balance and window to display for.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientScenarioCardBridge {
    /** Unique identifier for the bridge record. */
    id: string;
    /** The Scenario this bridge belongs to. */
    scenarioId: string;
    /** The Card associated with this bridge. */
    cardId: string;
    /** Name of the card or account. */
    cardName: string;
    /** Computed start date for the bridge entry. */
    calcStartDate: string;
    /** Computed end date for the bridge entry. */
    calcEndDate: string | null;
    /** Display start date for the bridge entry. */
    displayStartDate: string;
    /** Display end date for the bridge entry. */
    displayEndDate: string | null;
    /** Starting balance for the bridge entry. */
    startBalance: number;
    /** Optional note attached to the bridge. */
    note: string | null;
}

/**
 * A "what-if" possible future projection of account behaviour.
 *
 * Used to model changes to current and past trends to plan potential real-world interventions.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientScenario {
    /** The Card / Account which is associated. Future work will allow multi-card Scenarios. */
    cardId: string;
    /** List of Card bridge entries for multi-card Scenarios. */
    cards?: IClientScenarioCardBridge[];
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** Longer user-defined description of what this Scenario represents. */
    description: string;
    /** Optional end date to finish the scenario. */
    endDate: string | null;
    /** Unique identifier. */
    id: string;
    /** Optional start-date to begin the scenario from. */
    startDate: string | null;
    /** Account ballance to begin the scenario with. */
    startBallance: number;
    /** User-defined Scenario title. */
    title: string;
    /** List of Transactors which provide the Scenario with its expected future changes. */
    transactors?: IClientTransactor[];
    /** Unique identifier of the user who owns the Scenario. */
    userId: string;
    /** ISO timestamp of most recent save. */
    updatedOn: string;
}

/**
 * A single historical transaction representing an action occurring on an account / card.
 * @category Types
 * @subcategory Client Types
 */
export interface IClientTransaction {
    /** The ballance at after the current transaction. */
    ballance: number;
    /** Card / account the transaction belongs to. */
    cardId: string | null;
    /** Category the transaction is assigned to. */
    categoryId: string | null;
    /** ISO timestamp of the date/time the record was first created. */
    createdOn: string;
    /** Cash flow into the account with this transaction. */
    credit: number;
    /** The ISO currency code. */
    currency: string | null;
    /** ISO timestamp when this transaction occurred. */
    date: number;
    /** Cash flow out of the account with this transaction. */
    debit: number;
    /** Short description or seller code. */
    description: string;
    /** Unique identifier. */
    id: string;
    /** What type the transaction is. */
    transactionType: string;
    /** ISO timestamp of most recent save. */
    updatedOn: string;
    /** The joined category associated. Only supplied on certain endpoints as requested. */
    assignedCategory?: IClientCategory;
}

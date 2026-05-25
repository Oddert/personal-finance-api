import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import knex from '../db/knex';
import { IUserRequest } from '../types/Auth.types';

import {
    respondBadRequest,
    respondCreated,
    respondNotFound,
    respondOk,
} from '../utils/responses';

import Transaction from '../models/Transaction';

dayjs.extend(customParseFormat);

/**
 * Returns all Transactions belonging to  the authenticated user.
 */
export const getTransactions = async (req: IUserRequest, res: Response) => {
    try {
        const startDate =
            typeof req.query?.from === 'string'
                ? dayjs(req.query.from).toDate()
                : dayjs(0).toDate();

        const endDate =
            typeof req.query?.to === 'string'
                ? dayjs(req.query.to).toDate()
                : dayjs(undefined).toDate();

        if (req.query.includeCategory) {
            if (req.query.cardId && typeof req.query.cardId === 'string') {
                const transactions = await Transaction.query()
                    .where('user_id', '=', req.user.id)
                    .where('card_id', '=', req.query.cardId)
                    .whereBetween('date', [startDate, endDate])
                    .withGraphFetched('assignedCategory')
                    .orderBy('date', 'DESC');
                return respondOk({ req, res, payload: { transactions } });
            }

            const transactions = await Transaction.query()
                .where('user_id', '=', req.user.id)
                .whereBetween('date', [startDate, endDate])
                .withGraphFetched('assignedCategory')
                .orderBy('date', 'DESC');

            return respondOk({ req, res, payload: { transactions } });
        }

        if (req.query.cardId && typeof req.query.cardId === 'string') {
            const transactions = await Transaction.query()
                .where('user_id', '=', req.user.id)
                .whereBetween('date', [startDate, endDate])
                .where('card_id', '=', req.query.cardId)
                .orderBy('date', 'DESC');

            return respondOk({ req, res, payload: { transactions } });
        }

        const transactions = await Transaction.query()
            .where('user_id', '=', req.user.id)
            .whereBetween('date', [startDate, endDate])
            .orderBy('date', 'DESC');
        return respondOk({ req, res, payload: { transactions } });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Returns aggregated Transaction data grouped by month and category for a selected date range.
 * Optional filter by Card ID.
 */
export const getTransactionsAgg = async (req: IUserRequest, res: Response) => {
    try {
        const startDate =
            typeof req.query?.from === 'string'
                ? dayjs(req.query.from).toDate()
                : dayjs('2020-01-01').toDate();

        const endDate =
            typeof req.query?.to === 'string'
                ? dayjs(req.query.to).toDate()
                : dayjs(undefined).toDate();

        const pivot =
            typeof req.query.pivot === 'string' ? req.query.pivot : 'time';

        if (req.query.cardId && typeof req.query.cardId === 'string') {
            interface IAggregateDatapoint {
                categoryId: string;
                month: Date;
                totalCredit: number;
                totalDebit: number;
                categoryName: string;
            }

            type TResponseFormat = Record<
                string,
                {
                    data: IAggregateDatapoint[];
                    totalDebit: number;
                    totalCredit: number;
                }
            >;

            const aggregates: IAggregateDatapoint[] = await knex
                .with('monthly_agg', (qb: any) => {
                    qb.select('category_id')
                        .select(
                            knex.raw(
                                "date_trunc('month', date)::date as month",
                            ),
                        )
                        .sum({ total_credit: 'credit', total_debit: 'debit' })
                        .from('transaction')
                        .where('user_id', '=', req.user.id)
                        .whereBetween('date', [startDate, endDate])
                        .groupBy('category_id')
                        .groupByRaw("date_trunc('month', date)");
                })
                .select(
                    'monthly_agg.category_id as categoryId',
                    'monthly_agg.month',
                    'monthly_agg.total_credit as totalCredit',
                    'monthly_agg.total_debit as totalDebit',
                    'category.label as categoryName',
                )
                .from('monthly_agg')
                .leftJoin('category', 'monthly_agg.category_id', 'category.id')
                .orderByRaw('monthly_agg.category_id, monthly_agg.month');

            const transactions: TResponseFormat = (() => {
                if (pivot === 'time') {
                    const groupedByMonth = aggregates.reduce(
                        (acc: TResponseFormat, item: IAggregateDatapoint) => {
                            const month = dayjs(item.month).format('YYYY-MM');
                            if (!acc[month]) {
                                acc[month] = {
                                    data: [],
                                    totalCredit: 0,
                                    totalDebit: 0,
                                };
                            }
                            acc[month].data.push(item);
                            acc[month].totalCredit += item.totalCredit;
                            acc[month].totalDebit += item.totalDebit;
                            return acc;
                        },
                        {},
                    );
                    return groupedByMonth;
                } else {
                    const groupedByCategory = aggregates.reduce(
                        (acc: TResponseFormat, item: IAggregateDatapoint) => {
                            if (!acc[item.categoryId]) {
                                acc[item.categoryId] = {
                                    data: [],
                                    totalCredit: 0,
                                    totalDebit: 0,
                                };
                            }
                            acc[item.categoryId].data.push(item);
                            acc[item.categoryId].totalCredit +=
                                item.totalCredit;
                            acc[item.categoryId].totalDebit += item.totalDebit;
                            return acc;
                        },
                        {},
                    );
                    return groupedByCategory;
                }
            })();

            return respondOk({
                req,
                res,
                payload: { transactions },
            });
        }

        return respondBadRequest({
            req,
            res,
            error: 'No parameter "cardId" provided.',
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Retrieves a single Transaction item by ID.
 */
export const getSingleTransactions = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const transaction = req.query.includeCategory
            ? await Transaction.query()
                  .findById(req.params.id)
                  .where('user_id', '=', req.user.id)
                  .withGraphFetched('assignedCategory')
            : await Transaction.query()
                  .findById(req.params.id)
                  .where('user_id', '=', req.user.id);

        if (!transaction) {
            return respondNotFound({
                req,
                res,
                payload: { id: req.params.id },
            });
        }
        return respondOk({ req, res, payload: { transaction } });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Creates a single new Transaction and returns the result.
 */
export const createSingleTransaction = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const date = new Date().toISOString();
        const body = {
            ...req.body,
            created_on: date,
            updated_on: date,
            userId: req.user.id,
            id: uuid(),
        };

        // TODO: Research why the beforeInsert hooks are not working and replace:
        if (req.body.assignedCategory) {
            body.assignedCategory.created_on = date;
            body.assignedCategory.updated_on = date;
            if (req.body.assignedCategory.matchers) {
                body.assignedCategory.matchers =
                    req.body.assignedCategory.matchers.map((matcher: any) => ({
                        ...matcher,
                        created_on: date,
                        updated_on: date,
                    }));
            }
        }

        const transaction = req.body.assignedCategory
            ? await Transaction.query().insertGraphAndFetch(body)
            : await Transaction.query().insertAndFetch(body);

        return respondCreated({
            req,
            res,
            payload: { transaction },
            message: req.t('transaction.messages.createdSuccessfully'),
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Updates a single Transaction belonging to the authenticated user.
 */
export const updateSingleTransaction = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const date = new Date().toISOString();
        const body = { ...req.body, updated_on: date };

        const transaction = await Transaction.query()
            .where('user_id', '=', req.user.id)
            .patchAndFetchById(req.params.id, body);

        return respondCreated({
            req,
            res,
            payload: { transaction },
            message: req.t('transaction.messages.updatedSuccessfully'),
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Deletes a single Transaction by ID. Budget must belong to the authenticated user.
 */
export const deleteSingleTransaction = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        await Transaction.query()
            .where('user_id', '=', req.user.id)
            .deleteById(req.params.id);

        return respondOk({
            req,
            res,
            message: req.t('transaction.messages.deletedSuccessfully'),
            statusCode: 204,
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Creates a batch of transactions from a list and returns the result.
 */
export const createManyTransactions = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const date = new Date().toISOString();
        const createdTransactions = [];

        for (const transaction of req.body.transactions) {
            const body = {
                ...transaction,
                created_on: date,
                updated_on: date,
                userId: req.user.id,
                categoryId: transaction.assignedCategory,
                id: uuid(),
            };
            if (typeof transaction.date === 'string') {
                body.date = dayjs(transaction.date, 'DD/MM/YYYY').valueOf();
            }

            const createdTransaction =
                await Transaction.query().insertAndFetch(body);
            createdTransactions.push(createdTransaction);
        }

        return respondCreated({
            req,
            res,
            payload: { createdTransactions },
            message: req.t('transaction.messages.transactionsCreated'),
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Bulk updates a list of Transactions using the patch method and returns the result.
 */
export const updateManyTransactions = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const date = new Date().toISOString();
        const updatedTransactions = [];

        for (const transaction of req.body.transactions) {
            if (transaction.deleted) {
                await Transaction.query()
                    .where('id', '=', transaction.id)
                    .delete();
            } else {
                const body = {
                    ...transaction,
                    created_on: date,
                    updated_on: date,
                };
                if (typeof transaction.date === 'string') {
                    body.date = dayjs(transaction.date, 'DD/MM/YYYY').valueOf();
                }

                const updatedTransaction = await Transaction.query()
                    .where('user_id', '=', req.user.id)
                    .patchAndFetchById(transaction.id, body);
                updatedTransactions.push(updatedTransaction);
            }
        }

        return respondCreated({
            req,
            res,
            payload: { updatedTransactions },
            message: req.t('transaction.messages.transactionsUpdate'),
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Returns a number representing the number of Transactions in a selected date range for a user.
 */
export const getTransactionCount = async (req: IUserRequest, res: Response) => {
    try {
        const startDate =
            typeof req.query?.from === 'string'
                ? dayjs(req.query.from).toDate()
                : dayjs(0).toDate();

        const endDate =
            typeof req.query?.to === 'string'
                ? dayjs(req.query.to).toDate()
                : dayjs(undefined).toDate();

        const cardId = req.query.cardId ? String(req.query.cardId) : null;

        if (!cardId) {
            return respondBadRequest({
                req,
                res,
                message: 'No Card ID supplied in request.',
            });
        }

        const count = await Transaction.query()
            .where('user_id', '=', req.user.id)
            .whereBetween('date', [startDate, endDate])
            .where('card_id', '=', cardId)
            .resultSize();

        return respondOk({ req, res, payload: { count } });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

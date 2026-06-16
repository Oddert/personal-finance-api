import { Response } from 'express';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { IUserRequest } from '../types/Auth.types';

import { respondBadRequest, respondOk } from '../utils/responses';

import Budget from '../models/Budget';
import Card from '../models/Card';
import Category from '../models/Category';
import Scenario from '../models/Scenario';
import Transaction from '../models/Transaction';
import {
    IBudget,
    ICard,
    ICategory,
    IScenario,
    ITransaction,
} from '../types/ModelResponseFormats.types';
import BudgetRow from '../models/BudgetRow';
import CategoryMatcher from '../models/CategoryMatcher';
import Transactor from '../models/Transactor';
import Scheduler from '../models/Scheduler';
import Matcher from '../models/Matcher';

dayjs.extend(customParseFormat);

/**
 * Returns all Transactions belonging to  the authenticated user.
 */
export const exportAllData = async (req: IUserRequest, res: Response) => {
    try {
        const budgets = await Budget.query()
            .where('budget.user_id', '=', req.user.id)
            .withGraphJoined('budgetRows');
        const cards = await Card.query().where('user_id', '=', req.user.id);
        const categories = await Category.query()
            .where('user_id', '=', req.user.id)
            .orderBy('label', 'ASC')
            .withGraphFetched('matchers');
        const scenarios = (
            await Scenario.query()
                .where('user_id', '=', req.user.id)
                .withGraphFetched('transactors.[schedulers]')
                .orderBy('title', 'DESC')
        ).map((scenario) => scenario.toJson());

        const transactions = await Transaction.query()
            .where('user_id', '=', req.user.id)
            .withGraphFetched('assignedCategory')
            .orderBy('date', 'DESC');

        return respondOk({
            req,
            res,
            payload: { budgets, cards, categories, scenarios, transactions },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Returns all Transactions belonging to  the authenticated user.
 */
export const clearAndReImportData = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const body: {
            budgets: IBudget[];
            cards: ICard[];
            categories: ICategory[];
            scenarios: IScenario[];
            transactions: ITransaction[];
        } = req.body;

        await Transaction.query().delete();
        await BudgetRow.query().delete();
        await Budget.query().delete();
        await CategoryMatcher.query().delete();
        await Matcher.query().delete();
        await Category.query().delete();
        await Scheduler.query().delete();
        await Transactor.query().delete();
        await Scenario.query().delete();
        await Card.query().delete();

        for (const card of body.cards) {
            // @ts-expect-error
            await Card.query().insertGraphAndFetch({
                ...card,
                userId: req.user.id,
                createdOn: new Date(card.createdOn).toISOString(),
                updatedOn: new Date(card.updatedOn).toISOString(),
                expires: new Date(card.expires).toISOString(),
            });
        }
        for (const category of body.categories) {
            await Category.query().insertGraphAndFetch({
                ...category,
                user_id: req.user.id,
                created_on: new Date(category.created_on).toISOString(),
                updated_on: new Date(category.updated_on).toISOString(),
            });
        }
        for (const transaction of body.transactions) {
            // parameter assignedCategory disallowed here
            // @ts-expect-error
            await Transaction.query().insertAndFetch({
                ...transaction,
                date: new Date(transaction.date).toISOString(),
                currency: transaction.currency ?? undefined,
                created_on: new Date(transaction.createdOn).toISOString(),
                updated_on: new Date(transaction.updatedOn).toISOString(),
                userId: req.user.id,
            });
        }
        for (const budget of body.budgets) {
            // @ts-expect-error
            await Budget.query().insertGraphAndFetch({
                ...budget,
                createdOn: new Date(budget.createdOn).toISOString(),
                updatedOn: new Date(budget.updatedOn).toISOString(),
                userId: req.user.id,
                budgetRows: budget.budgetRows.map((row) => ({
                    ...row,
                    userId: req.user.id,
                })),
            });
        }
        for (const scenario of body.scenarios) {
            await Scenario.query().insertGraphAndFetch({
                ...scenario,
                userId: req.user.id,
                createdOn: new Date(scenario.createdOn).toISOString(),
                updatedOn: new Date(scenario.updatedOn).toISOString(),
                transactors: scenario.transactors.map((tr) => ({
                    ...tr,
                    userId: req.user.id,
                    createdOn: new Date(tr.createdOn).toISOString(),
                    updatedOn: new Date(tr.updatedOn).toISOString(),
                    schedulers: tr.schedulers.map((sched) => ({
                        ...sched,
                        userId: req.user.id,
                        createdOn: new Date(sched.createdOn).toISOString(),
                        updatedOn: new Date(sched.updatedOn).toISOString(),
                    })),
                })),
            });
        }

        return respondOk({
            req,
            res,
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

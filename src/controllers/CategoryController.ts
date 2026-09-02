import { Response } from 'express';
import { v4 as uuid } from 'uuid';

import { IUserRequest } from '../types/Auth.types';

import {
    respondBadRequest,
    respondCreated,
    respondNotFound,
    respondOk,
} from '../utils/responses';

import Category, { reprCategory, reprCategoryList } from '../models/Category';
import Matcher from '../models/Matcher';
import Transaction from '../models/Transaction';

/**
 * Returns all Categories belonging to  the authenticated user.
 */
export const getCategories = async (req: IUserRequest, res: Response) => {
    try {
        if (req.query.includeMatchers) {
            const categories = await Category.query()
                .where('user_id', '=', req.user.id)
                .orderBy('label', 'ASC')
                .withGraphFetched('matchers');

            return respondOk({
                req,
                res,
                payload: { categories: reprCategoryList(categories) },
            });
        }

        const categories = await Category.query()
            .where('user_id', '=', req.user.id)
            .orderBy('label', 'ASC');

        return respondOk({
            req,
            res,
            payload: { categories: reprCategoryList(categories) },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Retrieves a single Category item by ID with Budget Rows joined. Budget must belong to the authenticated user.
 */
export const getSingleCategory = async (req: IUserRequest, res: Response) => {
    try {
        const category = req.query.includeMatchers
            ? await Category.query()
                  .findById(req.params.id)
                  .where('user_id', '=', req.user.id)
                  .withGraphFetched('matchers')
            : await Category.query()
                  .findById(req.params.id)
                  .where('user_id', '=', req.user.id);

        if (!category) {
            return respondNotFound({
                req,
                res,
                message: req.t('category.messages.notFoundById', {
                    categoryId: req.params.id,
                }),
            });
        }

        return respondOk({
            req,
            res,
            payload: { category: reprCategory(category) },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Creates a single new Category and returns the result.
 */
export const createSingleCategory = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const date = new Date().toISOString();
        const body = {
            colour: req.body.colour,
            description: req.body.description,
            label: req.body.label,
            matchers: req.body.matchers
                ? req.body.matchers.map((matcher: any) => ({
                      match_type: matcher.matchType,
                      case_sensitive: matcher.caseSensitive,
                      match: matcher.match,
                      user_id: req.user.id,
                      created_on: date,
                      updated_on: date,
                      id: uuid(),
                  }))
                : [],
            created_on: date,
            updated_on: date,
            user_id: req.user.id,
            id: uuid(),
        };

        const category = req.body.matchers
            ? await Category.query().insertGraphAndFetch(body)
            : await Category.query().insertAndFetch(body);

        return respondCreated({
            req,
            res,
            payload: { category: reprCategory(category) },
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Updates a single Category belonging to the authenticated user.
 */
export const updateSingleCategory = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const body = {
            colour: req.body.colour,
            description: req.body.description,
            label: req.body.label,
            matchers: req.body.matchers
                ? req.body.matchers.map((matcher: any) => ({
                      match: matcher.match,
                      match_type: matcher.matchType,
                      case_sensitive: matcher.caseSensitive,
                      id: matcher.id ?? uuid(),
                  }))
                : [],
            updated_on: new Date().toISOString(),
        };

        if (req.body.matchers) {
            const category = await Category.query()
                .findById(req.params.id)
                .where('user_id', '=', req.user.id);

            if (!category) {
                return respondBadRequest({
                    req,
                    res,
                    error: req.t('category.messages.notFoundById', {
                        categoryId: req.params.id,
                    }),
                });
            }

            const createHashmap = (
                acc: { [key: string]: any },
                matcher: any,
            ) => {
                if (matcher?.id) {
                    acc[matcher.id] = matcher;
                }
                return acc;
            };

            const existingMatchers =
                await category.$relatedQuery<Matcher>('matchers');
            const requestedMatchersLookup: object = req.body.matchers.reduce(
                createHashmap,
                {},
            );

            // Search over the existing Matchers
            //      if found in the requested lookup object; do nothing
            //      if not found; un-relate (do not delete)
            existingMatchers.forEach((matcher) => {
                if (
                    matcher.id &&
                    !requestedMatchersLookup.hasOwnProperty(matcher.id)
                ) {
                    category
                        .$relatedQuery('matchers')
                        .unrelate()
                        .where('id', matcher.id);
                }
            });

            // Search over the requested Matchers
            //      if it exists; relate to category
            //      if not found; create and relate
            for (const matcher of req.body.matchers) {
                if (matcher?.id) {
                    const foundMatcher = await Matcher.query()
                        .findById(matcher.id)
                        .where('user_id', '=', req.user.id);

                    if (foundMatcher) {
                        category.$relatedQuery('matchers').relate(matcher.id);
                    } else {
                        const createdMatcher =
                            await Matcher.query().insertAndFetch(matcher);
                        category
                            .$relatedQuery('matchers')
                            .relate(createdMatcher);
                    }
                }
            }
        }

        const category = req.params.includeMatchers
            ? await Category.query()
                  .patchAndFetchById(req.params.id, body)
                  .where('user_id', '=', req.user.id)
                  .withGraphFetched('matchers')
            : await Category.query()
                  .patchAndFetchById(req.params.id, body)
                  .where('user_id', '=', req.user.id);

        return respondCreated({
            req,
            res,
            payload: { category: reprCategory(category) },
            message: 'category.messages.updatedSuccessfully',
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Deletes a single Category by ID. Category must belong to the authenticated user.
 */
export const deleteSingleCategory = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const category = await Category.query()
            .findById(req.params.id)
            .where('user_id', '=', req.user.id);

        await category?.$relatedQuery('matchers').unrelate();
        // BUG: 'category' must be an integer?? -> relation un-mapping seems to work differently with HasMany vs ManyToMany
        // await category?.$relatedQuery('transactions').unrelate()
        await Transaction.query()
            .where('category_id', req.params.id)
            .unrelate();

        await Category.query()
            .deleteById(req.params.id)
            .where('user_id', '=', req.user.id);

        return respondOk({
            req,
            res,
            message: 'category.messages.deletedSuccessfully',
            statusCode: 204,
        });
    } catch (error: any) {
        return respondBadRequest({ req, res, error: error.message });
    }
};

/**
 * Creates one or more Categories at a time and returns the result as an array.
 */
export const createManyCategories = async (
    req: IUserRequest,
    res: Response,
) => {
    try {
        const date = new Date().toISOString();
        const createdMatchers: Category[] = [];

        for (const category of req.body.categories) {
            const body = {
                colour: category.colour,
                description: category.description,
                label: category.label,
                matchers: category.matchers
                    ? category.matchers.map((matcher: any) => ({
                          match_type: matcher.matchType,
                          case_sensitive: matcher.caseSensitive,
                          match: matcher.match,
                          user_id: req.user.id,
                          id: uuid(),
                      }))
                    : [],
                created_on: date,
                updated_on: date,
                user_id: req.user.id,
                id: uuid(),
            };
            const createdCategory = await Category.query().insertAndFetch(body);
            createdMatchers.push(createdCategory);
        }

        return respondCreated({
            req,
            res,
            payload: { createdMatchers },
            message: req.t('category.messages.categoriesCreated'),
        });
    } catch (error: any) {
        return respondBadRequest({
            req,
            res,
            error: error.message,
        });
    }
};

import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { requiresAuth } from '../security/middleware';

import {
    createSingleTransaction,
    getTransactions,
    getSingleTransactions,
    updateSingleTransaction,
    deleteSingleTransaction,
    createManyTransactions,
    updateManyTransactions,
    getTransactionCount,
    getTransactionsAgg,
} from '../controllers/TransactionController';

import {
    createManyTransactionSchema,
    createTransactionSchema,
    updateTransactionSchema,
} from '../schemas/TransactionSchema';

const router = Router();

router
    .route('/')
    .get(requiresAuth, getTransactions)
    .post(
        requiresAuth,
        checkSchema(createTransactionSchema),
        createSingleTransaction,
    );

router.route('/count').get(requiresAuth, getTransactionCount);

router
    .route('/create-many')
    .post(
        requiresAuth,
        checkSchema(createManyTransactionSchema),
        createManyTransactions,
    );

router
    .route('/update-many')
    .put(
        requiresAuth,
        checkSchema(createManyTransactionSchema),
        updateManyTransactions,
    );

router.route('/agg').get(requiresAuth, getTransactionsAgg);

router
    .route('/:id')
    .get(requiresAuth, getSingleTransactions)
    .put(
        requiresAuth,
        checkSchema(updateTransactionSchema),
        updateSingleTransaction,
    )
    .delete(requiresAuth, deleteSingleTransaction);

export default router;

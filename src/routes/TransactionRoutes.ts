import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { requiresAuth } from '../security/middleware'

import {
    createSingleTransaction,
    getTransaction,
    getSingleTransactions,
    updateSingleTransaction,
    deleteSingleTransaction,
    createManyTransactions,
    updateManyTransactions,
} from '../controllers/TransactionController'

import {
    createManyTransactionSchema,
    createTransactionSchema,
    updateTransactionSchema
} from '../schemas/TransactionSchema'

const router = Router()

router.route('/')
    .get(requiresAuth, getTransaction)
    .post(
        requiresAuth,
        checkSchema(createTransactionSchema),
        createSingleTransaction,
    )
    
router.route('/create-many')
    .post(
        requiresAuth,
        checkSchema(createManyTransactionSchema),
        createManyTransactions,
    )

router.route('/update-many')
    .put(
        requiresAuth,
        checkSchema(createManyTransactionSchema),
        updateManyTransactions,
    )

router.route('/:id')
    .get(requiresAuth, getSingleTransactions)
    .put(
        requiresAuth,
        checkSchema(updateTransactionSchema),
        updateSingleTransaction,
    )
    .delete(requiresAuth, deleteSingleTransaction)

export default router
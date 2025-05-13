import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { requiresAuth } from '../security/middleware'

import {
    createSingleBudget,
    deleteSingleBudget,
    getBudgetRows,
    getBudgets,
    getSingleBudget,
    setActiveBudget,
    updateSingleBudget,
} from '../controllers/BudgetController'

import {
    budgetCreateSchema,
    budgetUpdateSchema,
} from '../schemas/BudgetSchemas'

const router = Router()

router.route('/')
    .get(requiresAuth, getBudgets)
    .post(checkSchema(budgetCreateSchema),requiresAuth, createSingleBudget)

router.route('/:id')
    .get(requiresAuth, getSingleBudget)
    .put(checkSchema(budgetUpdateSchema), requiresAuth, updateSingleBudget)
    .delete(requiresAuth, deleteSingleBudget)

router.route('/preferences/:id')
    .put(requiresAuth, setActiveBudget)

router.route('/rows')
    .get(requiresAuth, getBudgetRows)

export default router

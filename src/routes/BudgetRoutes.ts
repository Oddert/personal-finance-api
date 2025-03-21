import { Router } from 'express'

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

const router = Router()

router.route('/')
    .get(requiresAuth, getBudgets)
    .post(requiresAuth, createSingleBudget)

router.route('/:id')
    .get(requiresAuth, getSingleBudget)
    .put(requiresAuth, updateSingleBudget)
    .delete(requiresAuth, deleteSingleBudget)

router.route('/preferences/:id')
    .put(requiresAuth, setActiveBudget)

router.route('/rows')
    .get(requiresAuth, getBudgetRows)

export default router

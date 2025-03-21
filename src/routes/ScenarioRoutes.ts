import { Router } from 'express'

import { requiresAuth } from '../security/middleware'

import {
    createManyScenarios,
    createSingleScenario,
    deleteManyScenarios,
    deleteSingleScenario,
    getScenarios,
    getSingleScenario,
    updateSingleScenario,
} from '../controllers/ScenarioController'

const router = Router()

router.route('/')
    .get(requiresAuth, getScenarios)
    .post(requiresAuth, createSingleScenario)

router.route('/:id')
    .get(requiresAuth, getSingleScenario)
    .put(requiresAuth, updateSingleScenario)
    .delete(requiresAuth, deleteSingleScenario)

router.route('/create-many')
    .post(requiresAuth, createManyScenarios)

router.route('/delete-many')
    .post(requiresAuth, deleteManyScenarios)

export default router

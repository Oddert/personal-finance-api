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

import { scenarioCreateManySchema, scenarioCreateSchema, scenarioDeleteManySchema } from '../schemas/ScenarioSchemas'
import { checkSchema } from 'express-validator'

const router = Router()

router.route('/')
    .get(requiresAuth, getScenarios)
    .post(
        checkSchema(scenarioCreateSchema),
        requiresAuth,
        createSingleScenario
    )

router.route('/:id')
    .get(requiresAuth, getSingleScenario)
    .put(
        checkSchema(scenarioCreateSchema),
        requiresAuth,
        updateSingleScenario
    )
    .delete(requiresAuth, deleteSingleScenario)

router.route('/create-many')
    .post(
        checkSchema(scenarioCreateManySchema),
        requiresAuth,
        createManyScenarios
    )

router.route('/delete-many')
    .post(
        checkSchema(scenarioDeleteManySchema),
        requiresAuth,
        deleteManyScenarios
    )

export default router

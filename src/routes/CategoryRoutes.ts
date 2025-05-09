import { Router } from 'express'
import { checkSchema } from 'express-validator'

import {
    createManyCategories,
    createSingleCategory,
    deleteSingleCategory,
    getCategories,
    getSingleCategory,
    updateSingleCategory,
} from '../controllers/CategoryController'
import {
    createCategorySchema,
    createManyCategoriesSchema,
    updateCategorySchema,
} from '../schemas/CategorySchema'
import { requiresAuth } from '../security/middleware'

const router = Router()

router.route('/')
    .get(requiresAuth, getCategories)
    .post(
        requiresAuth,
        checkSchema(createCategorySchema),
        createSingleCategory,
    )

router.route('/:id')
    .get(requiresAuth, getSingleCategory)
    .put(
        requiresAuth, 
        checkSchema(updateCategorySchema),
        updateSingleCategory,
    )
    .delete(requiresAuth, deleteSingleCategory)

router.route('/create-many')
    .post(
        requiresAuth, 
        checkSchema(createManyCategoriesSchema),
        createManyCategories,
    )

export default router

import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { requiresAuth } from '../security/middleware';

import {
    createManyMatchers,
    createSingleMatcher,
    deleteSingleMatcher,
    getMatchers,
    getSingleMatcher,
    updateSingleMatcher,
} from '../controllers/MatcherController';

import {
    createManyMatchersSchema,
    createMatcherSchema,
    updateMatcherSchema,
} from '../schemas/MatcherSchemas';

const router = Router();

router
    .route('/')
    .get(requiresAuth, getMatchers)
    .post(requiresAuth, checkSchema(createMatcherSchema), createSingleMatcher);

router
    .route('/:id')
    .get(requiresAuth, getSingleMatcher)
    .put(requiresAuth, checkSchema(updateMatcherSchema), updateSingleMatcher)
    .delete(requiresAuth, deleteSingleMatcher);

router
    .route('/create-many')
    .post(
        requiresAuth,
        checkSchema(createManyMatchersSchema),
        createManyMatchers,
    );

export default router;

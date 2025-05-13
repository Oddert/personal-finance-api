import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { requiresAuth } from '../security/middleware';

import {
    createSingleCard,
    deleteSingleCard,
    getCards,
    getSingleCard,
    setActiveCard,
    updateSingleCard,
} from '../controllers/CardController';

import { cardCreateSchema, cardUpdateSchema } from '../schemas/CardSchema';

const router = Router();

router
    .route('/')
    .get(requiresAuth, getCards)
    .post(checkSchema(cardCreateSchema), requiresAuth, createSingleCard);

router
    .route('/:id')
    .get(requiresAuth, getSingleCard)
    .put(checkSchema(cardUpdateSchema), requiresAuth, updateSingleCard)
    .delete(requiresAuth, deleteSingleCard);

router.route('/preferences/:id').put(requiresAuth, setActiveCard);

export default router;

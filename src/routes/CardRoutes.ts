import { Router } from 'express'

import { requiresAuth } from '../security/middleware'

import {
    createSingleCard,
    deleteSingleCard,
    getCards,
    getSingleCard,
    setActiveCard,
    updateSingleCard,
} from '../controllers/CardController'

const router = Router()

router.route('/')
    .get(requiresAuth, getCards)
    .post(requiresAuth, createSingleCard)

router.route('/:id')
    .get(requiresAuth, getSingleCard)
    .put(requiresAuth, updateSingleCard)
    .delete(requiresAuth, deleteSingleCard)

router.route('/preferences/:id')
    .put(requiresAuth, setActiveCard)

export default router

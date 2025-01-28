import { Router } from 'express'

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
    .get(getCards)
    .post(createSingleCard)

router.route('/:id')
    .get(getSingleCard)
    .put(updateSingleCard)
    .delete(deleteSingleCard)

router.route('/preferences/:id')
    .put(setActiveCard)

export default router

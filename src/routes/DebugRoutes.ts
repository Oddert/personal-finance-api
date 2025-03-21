import { Router } from 'express'

import {
    getMatcherCategory,
    getSeeds,
    getTokenExclude,
    resetServer,
} from '../controllers/DebugController'
	
const router = Router()

router.route('/reset-database')
    .post(resetServer)

router.route('/matcher-category')
    .get(getMatcherCategory)

router.route('/create-seeds')
    .get(getSeeds)

router.route('/token-exclude')
    .get(getTokenExclude)

export default router

import { Router } from 'express'

import {
    getMatcherCategory,
    getSeeds,
    getTokenExclude,
    getUsers,
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

router.route('/users')
    .get(getUsers)

export default router

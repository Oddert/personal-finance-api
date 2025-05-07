import { Router } from 'express'

import {
    getUserDetails,
    getUserExists,
    loginUser,
    refreshToken,
    registerUser,
} from '../controllers/AuthController'

import { requiresAuth } from '../security/middleware'

const router = Router()

router.route('/signup')
    .post(registerUser)

router.route('/login')
    .post(loginUser)

router.route('/refresh-token')
    .post(refreshToken)

router.route('/user-exists/:username')
    .get(getUserExists)

router.route('/user')
    .get(requiresAuth, getUserDetails)

export default router

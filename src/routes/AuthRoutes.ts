import { Router } from 'express'

import { getUserDetails, getUserExists, loginUser, registerUser } from '../controllers/AuthController'

import { requiresAuth } from '../security/middleware'

const router = Router()

router.route('/signup')
    .post(registerUser)

router.route('/login')
    .post(loginUser)

router.route('/user-exists/:username')
    .get(getUserExists)

router.route('/user')
    .get(requiresAuth, getUserDetails)

export default router

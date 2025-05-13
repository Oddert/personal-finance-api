import { Router } from 'express'
import { checkSchema } from 'express-validator'

import {
    getUserDetails,
    getUserExists,
    loginUser,
    refreshToken,
    registerUser,
} from '../controllers/AuthController'

import {
    logInSchema,
    refreshTokenSchema,
    signUpSchema,
} from '../schemas/AuthSchemas'

import { requiresAuth } from '../security/middleware'

const router = Router()

router.route('/signup')
    .post(checkSchema(signUpSchema), registerUser)

router.route('/login')
    .post(checkSchema(logInSchema), loginUser)

router.route('/refresh-token')
    .post(checkSchema(refreshTokenSchema), refreshToken)

router.route('/user-exists/:username')
    .get(getUserExists)

router.route('/user')
    .get(requiresAuth, getUserDetails)

export default router

import { Router } from 'express';
import { checkSchema } from 'express-validator';

import {
    getUserDetails,
    getUserExists,
    loginUser,
    refreshUserAuthToken,
    registerUser,
    updateUserDetails,
} from '../controllers/AuthController';

import {
    logInSchema,
    refreshTokenSchema,
    signUpSchema,
    updateUserSchema,
} from '../schemas/AuthSchemas';

import { requiresAuth } from '../security/middleware';

const router = Router();

router.route('/signup').post(checkSchema(signUpSchema), registerUser);

router.route('/login').post(checkSchema(logInSchema), loginUser);

router
    .route('/refresh-token')
    .post(checkSchema(refreshTokenSchema), refreshUserAuthToken);

router.route('/user-exists/:username').get(getUserExists);

router
    .route('/user')
    .get(requiresAuth, getUserDetails)
    .put(requiresAuth, checkSchema(updateUserSchema), updateUserDetails);

export default router;

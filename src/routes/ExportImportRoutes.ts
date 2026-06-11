import { Router } from 'express';

import { requiresAuth } from '../security/middleware';

import {
    clearAndReImportData,
    exportAllData,
} from '../controllers/ExportImportController';

const router = Router();

router.route('/export').get(requiresAuth, exportAllData);

router.route('/import').post(requiresAuth, clearAndReImportData);

export default router;

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import PersonnelDevelopmentActivityController from './personnel-development-activity.controller';

const router = express.Router();

router.get('/', PersonnelDevelopmentActivityController.all);
router.get('/:_id', PersonnelDevelopmentActivityController.byId);
router.get('/user/:userId', PersonnelDevelopmentActivityController.byUserId);
router.post('/', PersonnelDevelopmentActivityController.create);
router.put('/', PersonnelDevelopmentActivityController.update);
router.delete('/', PersonnelDevelopmentActivityController.delete);

export default router;

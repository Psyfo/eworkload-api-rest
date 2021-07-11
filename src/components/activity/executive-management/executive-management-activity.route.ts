import express from 'express';

import ExecutiveManagementActivityController from './executive-management-activity.controller';

const router = express.Router();

router.get('/', ExecutiveManagementActivityController.all);
router.get('/:_id', ExecutiveManagementActivityController.byId);
router.get('/user/:userId', ExecutiveManagementActivityController.byUserId);
router.post('/', ExecutiveManagementActivityController.create);
router.put('/', ExecutiveManagementActivityController.update);
router.delete('/', ExecutiveManagementActivityController.delete);

export default router;

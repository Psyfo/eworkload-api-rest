import express from 'express';

import ExecutiveManagementWorkloadController from './executive-management-workload.controller';

const router = express.Router();

router.get('/', ExecutiveManagementWorkloadController.all);
router.get('/:_id', ExecutiveManagementWorkloadController.byId);
router.get('/user/:userId', ExecutiveManagementWorkloadController.byUserId);
router.post('/', ExecutiveManagementWorkloadController.create);
router.put('/', ExecutiveManagementWorkloadController.update);
router.delete('/', ExecutiveManagementWorkloadController.delete);

export default router;

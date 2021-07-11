import express from 'express';

import SupervisionWorkloadController from './supervision-workload.controller';

const router = express.Router();

router.get('/', SupervisionWorkloadController.all);
router.get('/:_id', SupervisionWorkloadController.byId);
router.get('/user/:userId', SupervisionWorkloadController.byUserId);
router.post('/', SupervisionWorkloadController.create);
router.put('/', SupervisionWorkloadController.update);
router.delete('/', SupervisionWorkloadController.delete);

export default router;

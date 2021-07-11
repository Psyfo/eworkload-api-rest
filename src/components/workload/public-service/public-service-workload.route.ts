import express from 'express';

import PublicServiceWorkloadController from './public-service-workload.controller';

const router = express.Router();

router.get('/', PublicServiceWorkloadController.all);
router.get('/:_id', PublicServiceWorkloadController.byId);
router.get('/user/:userId', PublicServiceWorkloadController.byUserId);
router.post('/', PublicServiceWorkloadController.create);
router.put('/', PublicServiceWorkloadController.update);
router.delete('/', PublicServiceWorkloadController.delete);

export default router;

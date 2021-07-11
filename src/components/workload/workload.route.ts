import express from 'express';

import WorkloadController from './workload.controller';

const router = express.Router();

router.get('/',WorkloadController.all);
router.get('/:_id',WorkloadController.byId);
router.get('/user/:userId',WorkloadController.byUserId);
router.post('/',WorkloadController.create);
router.put('/', WorkloadController.update);
router.delete('/',WorkloadController.delete);

export default router;

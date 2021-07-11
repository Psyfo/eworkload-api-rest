import express from 'express';

import ResearchWorkloadController from './research-workload.controller';

const router = express.Router();

router.get('/', ResearchWorkloadController.all);
router.get('/:_id', ResearchWorkloadController.byId);
router.get('/user/:userId', ResearchWorkloadController.byUserId);
router.post('/', ResearchWorkloadController.create);
router.put('/', ResearchWorkloadController.update);
router.delete('/', ResearchWorkloadController.delete);

export default router;

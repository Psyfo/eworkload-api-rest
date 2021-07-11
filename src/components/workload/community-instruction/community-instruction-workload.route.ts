import express from 'express';

import CommunityInstructionWorkloadController from './community-instruction-workload.controller';

const router = express.Router();

router.get('/', CommunityInstructionWorkloadController.all);
router.get('/:_id', CommunityInstructionWorkloadController.byId);
router.get('/user/:userId', CommunityInstructionWorkloadController.byUserId);
router.post('/', CommunityInstructionWorkloadController.create);
router.put('/', CommunityInstructionWorkloadController.update);
router.delete('/', CommunityInstructionWorkloadController.delete);

export default router;

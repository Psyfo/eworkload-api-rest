/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import CommunityInstructionActivityController from './community-instruction-activity.controller';

const router = express.Router();

router.get('/', CommunityInstructionActivityController.all);
router.get('/:_id', CommunityInstructionActivityController.byId);
router.get('/user/:userId', CommunityInstructionActivityController.byUserId);
router.post('/', CommunityInstructionActivityController.create);
router.put('/', CommunityInstructionActivityController.update);
router.delete('/', CommunityInstructionActivityController.delete);

export default router;

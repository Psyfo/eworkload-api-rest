import express from 'express';

import FormalInstructionActivityController from './formal-instruction-activity.controller';

const router = express.Router();

router.get('/', FormalInstructionActivityController.all);
router.get('/:_id', FormalInstructionActivityController.byId);
router.get('/user/:userId', FormalInstructionActivityController.byUserId);
router.post('/', FormalInstructionActivityController.create);
router.put('/', FormalInstructionActivityController.update);
router.delete('/', FormalInstructionActivityController.delete);

export default router;

import express from 'express';

import FormalInstructionWorkloadController from './formal-instruction-workload.controller';

const router = express.Router();

router.get('/', FormalInstructionWorkloadController.all);
router.get('/:_id', FormalInstructionWorkloadController.byId);
router.get('/user/:userId', FormalInstructionWorkloadController.byUserId);
router.post('/', FormalInstructionWorkloadController.create);
router.put('/', FormalInstructionWorkloadController.update);
router.delete('/', FormalInstructionWorkloadController.delete);

export default router;

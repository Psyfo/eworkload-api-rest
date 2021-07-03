import express from 'express';

import DutyController from '../controllers/duty.controller';

const router = express.Router();

router.get('/', DutyController.all);
router.get('/:_id', DutyController.byId);
router.get('/dutyId/:dutyId', DutyController.byDutyId);
router.post('/', DutyController.create);
router.put('/', DutyController.update);
router.delete('/', DutyController.delete);

export default router;

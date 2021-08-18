/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import DutyController from './duty.controller';

const router = express.Router();

router.get('/', DutyController.all);
router.get('/:_id', DutyController.byId);
router.post('/', DutyController.create);
router.put('/', DutyController.update);
router.delete('/', DutyController.delete);

export default router;

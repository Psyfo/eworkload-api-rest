/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import WorkFocusController from './work-focus.controller';

const router = express.Router();

router.get('/', WorkFocusController.all);
router.get('/:_id', WorkFocusController.byId);
router.post('/', WorkFocusController.create);
router.put('/', WorkFocusController.update);
router.delete('/', WorkFocusController.delete);

export default router;

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import QualificationController from './qualification.controller';

const router = express.Router();

router.get('/', QualificationController.all);
router.get('/:_id', QualificationController.byId);
router.post('/', QualificationController.create);
router.put('/', QualificationController.update);
router.delete('/', QualificationController.delete);

export default router;

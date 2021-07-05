import express from 'express';

import EnrollmentController from './enrollment.controller';

const router = express.Router();

router.get('/', EnrollmentController.all);
router.get('/:_id', EnrollmentController.byId);
router.post('/', EnrollmentController.create);
router.put('/', EnrollmentController.update);
router.delete('/', EnrollmentController.delete);

export default router;

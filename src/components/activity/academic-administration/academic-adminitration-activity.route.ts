import express from 'express';

import AcademicAdministrationActivityController from './academic-administration-activity.controller';

const router = express.Router();

router.get('/', AcademicAdministrationActivityController.all);
router.get('/:_id', AcademicAdministrationActivityController.byId);
router.get('/user/:userId', AcademicAdministrationActivityController.byUserId);
router.post('/', AcademicAdministrationActivityController.create);
router.put('/', AcademicAdministrationActivityController.update);
router.delete('/', AcademicAdministrationActivityController.delete);

export default router;

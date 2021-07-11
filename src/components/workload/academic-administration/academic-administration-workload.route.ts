import express from 'express';

import AcademicAdministrationWorkloadController from './academic-administration-workload.controller';

const router = express.Router();

router.get('/', AcademicAdministrationWorkloadController.all);
router.get('/:_id', AcademicAdministrationWorkloadController.byId);
router.get('/user/:userId', AcademicAdministrationWorkloadController.byUserId);
router.post('/', AcademicAdministrationWorkloadController.create);
router.put('/', AcademicAdministrationWorkloadController.update);
router.delete('/', AcademicAdministrationWorkloadController.delete);

export default router;

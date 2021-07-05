import express from 'express';

import ModuleController from './module.controller';

const router = express.Router();

router.get('/', ModuleController.all);
router.get('/:_id', ModuleController.byId);
router.get('/disciplineId/:disciplineId', ModuleController.byDiscipline);
router.get('/coordinatorId/:coordinatorId', ModuleController.byCoordinator);
router.get('/qualificationId/:qualificationId', ModuleController.byQualification);
router.post('/', ModuleController.create);
router.put('/', ModuleController.update);
router.delete('/', ModuleController.delete);

export default router;
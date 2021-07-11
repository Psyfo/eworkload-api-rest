import express from 'express';

import PersonnelDevelopmentWorkloadController from './personnel-development-workload.controller';

const router = express.Router();

router.get('/', PersonnelDevelopmentWorkloadController.all);
router.get('/:_id', PersonnelDevelopmentWorkloadController.byId);
router.get('/user/:userId', PersonnelDevelopmentWorkloadController.byUserId);
router.post('/', PersonnelDevelopmentWorkloadController.create);
router.put('/', PersonnelDevelopmentWorkloadController.update);
router.delete('/', PersonnelDevelopmentWorkloadController.delete);

export default router;

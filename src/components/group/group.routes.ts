import express from 'express';

import GroupController from './group.controller';

const router = express.Router();

router.get('/', GroupController.all);
router.get('/:_id', GroupController.byId);
router.get('/moduleId/:moduleId', GroupController.byModuleId);
router.get('/groupTotal', GroupController.groupTotal);
router.get('/remainingStudents', GroupController.remainingStudents);
router.get('/', GroupController.all);
router.post('/', GroupController.create);
router.put('/', GroupController.update);
router.delete('/', GroupController.delete);

export default router;

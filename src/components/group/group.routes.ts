/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import GroupController from './group.controller';

const router = Router();

router.get('/', GroupController.all);
router.get('/:_id', GroupController.byId);
router.get('/moduleId/:moduleId', GroupController.byModuleId);
router.get('/', GroupController.all);
router.post('/', GroupController.create);
router.put('/', GroupController.update);
router.delete('/', GroupController.delete);

export default router;

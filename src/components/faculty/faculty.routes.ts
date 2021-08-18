/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import FacultyController from './faculty.controller';


const router = Router();

router.get('/', FacultyController.all);
router.get('/:_id', FacultyController.byId);
router.post('/', FacultyController.create);
router.put('/', FacultyController.update);
router.delete('/', FacultyController.delete);

export default router;

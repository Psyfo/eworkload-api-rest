import express from 'express';

import StudentController from './../controllers/student.controller';

const router = express.Router();

router.get('/', StudentController.all);
router.get('/:_id', StudentController.byId);
router.post('/', StudentController.create);
router.put('/', StudentController.update);
router.delete('/', StudentController.delete);

export default router;
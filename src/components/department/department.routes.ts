import express from 'express';

import DepartmentController from './department.controller';

const router = express.Router();

router.get('/', DepartmentController.all);
router.get('/:_id', DepartmentController.byId);
router.get('/departmentId/:departmentId', DepartmentController.byDepartmentId);
router.get('/facultyId/:facultyId', DepartmentController.byFacultyId);
router.post('/', DepartmentController.create);
router.put('/', DepartmentController.update);
router.delete('/', DepartmentController.delete);

export default router;

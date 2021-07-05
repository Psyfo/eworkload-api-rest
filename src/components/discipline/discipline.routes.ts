import express from 'express';

import DisciplineController from './discipline.controller';

const router = express.Router();

router.get('/', DisciplineController.all);
router.get('/:_id', DisciplineController.byId);
router.get('/disciplineId/:disciplineId', DisciplineController.byDisciplineId);
router.post('/', DisciplineController.create);
router.put('/', DisciplineController.update);
router.delete('/', DisciplineController.delete);

export default router;

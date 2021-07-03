import express from 'express';

import PositionController from './../controllers/position.controller';

const router = express.Router();

router.get('/', PositionController.all);
router.get('/:_id', PositionController.byId);
router.post('/', PositionController.create);
router.put('/', PositionController.update);
router.delete('/', PositionController.delete);

export default router;
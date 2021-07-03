import express from 'express';

import BlockController from './../controllers/block.controller';

const router = express.Router();

router.get('/', BlockController.all);
router.get('/:_id', BlockController.byId);
router.get('/blockId/:blockId', BlockController.byBlockId);
router.post('/', BlockController.create);
router.put('/', BlockController.update);
router.delete('/', BlockController.delete);

export default router;

import express from 'express';

import OfferingTypeController from './../controllers/offering-type.controller';

const router = express.Router();

router.get('/', OfferingTypeController.all);
router.get('/:_id', OfferingTypeController.byId);
router.post('/', OfferingTypeController.create);
router.put('/', OfferingTypeController.update);
router.delete('/', OfferingTypeController.delete);

export default router;
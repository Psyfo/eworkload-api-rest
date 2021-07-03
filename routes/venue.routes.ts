import express from 'express';

import VenueController from './../controllers/venue.controller';

const router = express.Router();

router.get('/', VenueController.all);
router.get('/:_id', VenueController.byId);
router.post('/', VenueController.create);
router.put('/', VenueController.update);
router.delete('/', VenueController.delete);

export default router;
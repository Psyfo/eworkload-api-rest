/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import PublicServiceActivityController from './public-service-activity.controller';

const router = express.Router();

router.get('/', PublicServiceActivityController.all);
router.get('/:_id', PublicServiceActivityController.byId);
router.get('/user/:userId', PublicServiceActivityController.byUserId);
router.post('/', PublicServiceActivityController.create);
router.put('/', PublicServiceActivityController.update);
router.delete('/', PublicServiceActivityController.delete);

export default router;

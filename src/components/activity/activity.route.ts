import express from 'express';

import ActivityController from './activity.controller';

const router = express.Router();

router.get('/', ActivityController.all);
router.get('/:_id', ActivityController.byId);
router.get('/user/:userId', ActivityController.byUserId);
router.post('/', ActivityController.create);
router.put('/', ActivityController.update);
router.delete('/', ActivityController.delete);

export default router;

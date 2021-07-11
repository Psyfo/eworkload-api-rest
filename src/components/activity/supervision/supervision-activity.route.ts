import express from 'express';

import SupervisionActivityController from './supervision-activity.controller';

const router = express.Router();

router.get('/', SupervisionActivityController.all);
router.get('/:_id', SupervisionActivityController.byId);
router.get('/user/:userId', SupervisionActivityController.byUserId);
router.post('/', SupervisionActivityController.create);
router.put('/', SupervisionActivityController.update);
router.delete('/', SupervisionActivityController.delete);

export default router;

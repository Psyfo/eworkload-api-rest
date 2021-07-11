import express from 'express';

import ResearchActivityController from './research-activity.controller';

const router = express.Router();

router.get('/', ResearchActivityController.all);
router.get('/:_id', ResearchActivityController.byId);
router.get('/user/:userId', ResearchActivityController.byUserId);
router.post('/', ResearchActivityController.create);
router.put('/', ResearchActivityController.update);
router.delete('/', ResearchActivityController.delete);

export default router;

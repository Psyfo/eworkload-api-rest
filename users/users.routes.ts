import express from 'express';

import UserController from './../controllers/user.controller';

const router = express.Router();

router.get('/', UserController.all);
router.get('/:_id', UserController.byId);
router.get('/userId/:userId', UserController.byUserId);
router.get('/position/:positionId', UserController.byPosition);
router.post('/', UserController.create);
router.put('/', UserController.update);
router.delete('/', UserController.delete);

export default router;

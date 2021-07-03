import express from 'express';

import AuthController from './../auth/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/changePassword', AuthController.changePassword);

export default router;

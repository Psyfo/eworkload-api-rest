/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/changePassword', AuthController.changePassword);

export default router;

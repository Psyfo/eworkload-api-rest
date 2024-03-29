/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser } from '../components/user/user.interface';
import User from '../components/user/user.model';
import { logger } from '../config/logger.config';

class AuthController {
	static login = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const user: IUser | null = await User.findOne({ userId: req.body.userId });

			if (!user) {
				return res.status(400).json({ message: 'No result found' });
			}
			const isMatch = await bcrypt.compare(req.body.password, user.password);
			if (isMatch) {
				const token = jwt.sign({ userId: user.userId }, 'secret', {
					expiresIn: '1h'
				});
				const payload = {
					userId: user.userId,
					token: token,
					tokenExpiration: 1
				};
				logger.info(JSON.stringify(payload));
				return res.status(200).json(payload);
			} else {
				return res.status(400).json({ message: 'Password is not correct' });
			}
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static changePassword = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		// Compare passwords. Change and return result or throw error.
		const user: IUser | null = await User.findById({ _id: mongoose.Types.ObjectId(req.body._id) });
		if (!user) {
			return res.status(400).json({ message: 'No result found' });
		}
		const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
		if (isMatch !== true) {
			return res.status(400).json({ message: 'Password is not correct' });
		}
		// Check that new password is different
		if (req.body.newPassword === req.body.password) {
			return res.status(400).json({ message: 'Cannot use the same password' });
		}
		//Hash new password and update
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(req.body.newPassword, salt);
		await User.findOneAndUpdate(
			{ userId: user.userId },
			{
				$set: {
					password: hash
				}
			},
			{ upsert: true }
		);
		return res.status(400).json({ message: `Password changed for user: ${user.userId}` });
	};
}

export default AuthController;

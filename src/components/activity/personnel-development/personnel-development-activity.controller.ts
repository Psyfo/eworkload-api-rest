/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import { logger } from '../../../config/logger.config';
import PersonnelDevelopmentActivity from './personnel-development-activity.model';

class PersonnelDevelopmentActivityController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await PersonnelDevelopmentActivity.find();
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await PersonnelDevelopmentActivity.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await PersonnelDevelopmentActivity.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newPersonnelDevelopmentActivity = await new PersonnelDevelopmentActivity(req.body).save();
			const result = await PersonnelDevelopmentActivity.findOne({ _id: newPersonnelDevelopmentActivity._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await PersonnelDevelopmentActivity.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body._id) },
				{
					$set: req.body
				},
				{ upsert: true }
			);
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object updated');
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await PersonnelDevelopmentActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object deleted');
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
}

export default PersonnelDevelopmentActivityController;

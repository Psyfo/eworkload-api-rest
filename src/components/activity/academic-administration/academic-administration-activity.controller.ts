/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import AcademicAdministrationActivity from './academic-administration-activity.model';
import { IAcademicAdministrationActivity } from './academic-administration-activity.interface';

class AcademicAdministrationActivityController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await AcademicAdministrationActivity.find();
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
			const result = await AcademicAdministrationActivity.findOne({ _id: req.params._id });
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
			const result = await AcademicAdministrationActivity.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				if (error instanceof Error) {
					logger.error(error.message);
				}
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newAcademicAdministrationActivity: IAcademicAdministrationActivity = new AcademicAdministrationActivity(
				req.body
			);
			await newAcademicAdministrationActivity.save();
			const result = await AcademicAdministrationActivity.findOne({ _id: newAcademicAdministrationActivity._id });
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
			const result = await AcademicAdministrationActivity.findByIdAndUpdate(
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
			const result = await AcademicAdministrationActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default AcademicAdministrationActivityController;

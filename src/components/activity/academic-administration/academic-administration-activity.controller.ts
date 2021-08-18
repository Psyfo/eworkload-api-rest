/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import AcademicAdministrationActivity from './academic-administration-activity.model';

const AcademicAdministrationActivityController = {
	async all(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await AcademicAdministrationActivity.find();
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	},
	async byId(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await AcademicAdministrationActivity.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	},
	async byUserId(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await AcademicAdministrationActivity.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	},
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const newAcademicAdministrationActivity = await new AcademicAdministrationActivity(req.body).save();
			const result = await AcademicAdministrationActivity.findOne({ _id: newAcademicAdministrationActivity._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	},
	async update(req: Request, res: Response, next: NextFunction) {
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
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	},
	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await AcademicAdministrationActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object deleted');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	}
};

export default AcademicAdministrationActivityController;

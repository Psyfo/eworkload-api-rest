/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { logger } from '../../config/logger.config';
import parameters from '../../config/parameters.config';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { IWorkFocus } from './work-focus.interface';
import WorkFocus from './work-focus.model';

class WorkFocusController {
	static teachingHours = async (userId: string): Promise<number> => {
		const user: IUser = await User.findOne({ userId: userId }).populate('work-focus');
		const workFocus: IWorkFocus = await WorkFocus.findOne({ name: user.workFocusName });
		const teachingFocusPercentage: number = workFocus.teachingRatio;
		return (teachingFocusPercentage / 100) * parameters.annual_total_hours;
	};
	static researchHours = async (userId: string): Promise<number> => {
		const user: IUser = await User.findOne({ userId: userId }).populate('work-focus');
		const workFocus: IWorkFocus = await WorkFocus.findOne({ name: user.workFocusName });
		const researchFocusPercentage: number = workFocus.researchRatio;
		return (researchFocusPercentage / 100) * parameters.annual_total_hours;
	};
	static serviceHours = async (userId: string): Promise<number> => {
		const user: IUser = await User.findOne({ userId: userId }).populate('work-focus');
		const workFocus: IWorkFocus = await WorkFocus.findOne({ name: user.workFocusName });
		const serviceFocusPercentage: number = workFocus.serviceRatio;

		return (serviceFocusPercentage / 100) * parameters.annual_total_hours;
	};
	static annualHours = (): number => {
		return parameters.annual_total_hours;
	};
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await WorkFocus.find({});
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).send('Server Error');
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IWorkFocus = await WorkFocus.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).send('Server Error');
		}
	};
	static byUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IWorkFocus = await WorkFocus.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).send('Server Error');
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newWorkFocus: IWorkFocus = await new WorkFocus(req.body).save();
			const result = await WorkFocus.findOne({ _id: newWorkFocus._id });
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).send('Server Error');
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await WorkFocus.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true });
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).send('Server Error');
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await WorkFocus.findOneAndRemove({ _id: req.body._id });
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).send('Server Error');
		}
	};
}

export default WorkFocusController;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../../config/logger.config';
import WorkFocusController from '../../work-focus/work-focus.controller';
import { ISupervisionActivity, ISupervisionWorkload } from './supervision-activity.interface';
import SupervisionActivity from './supervision-activity.model';

class SupervisionActivityController {
	static all = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await SupervisionActivity.find().populate('user').populate('student');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byId = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await SupervisionActivity.findOne({
				_id: mongoose.Types.ObjectId(req.params._id)
			})
				.populate('user')
				.populate('student');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			await SupervisionActivityController.calcWorkload(result._id);
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byUserId = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await SupervisionActivity.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const newSupervisionActivity: any = await new SupervisionActivity(req.body);
			newSupervisionActivity.split = 100;
			await newSupervisionActivity.save();
			const result = await SupervisionActivity.findOne({ _id: newSupervisionActivity._id });
			logger.info('Object created');
			//update workload
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await SupervisionActivity.findByIdAndUpdate(
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
			await SupervisionActivityController.calcWorkload(result._id);
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static delete = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await SupervisionActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object deleted');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static totalHours = async (activity: any): Promise<number> => {
		const totalHours = 100;
		// if (activity.split !== 100) {
		//   totalHours *= activity.split / 100;
		// }

		return totalHours;
	};
	static percentageOfTeaching = async (activity: any): Promise<number> => {
		try {
			if (activity != undefined) {
				return (
					((await activity.workload.totalHours(activity)) /
						(await WorkFocusController.teachingHours(activity.userId))) *
					100
				);
			} else {
				return 0;
			}
		} catch (error) {
			logger.error(error.message);
			return 0;
		}
	};
	static percentageOfAnnual = async (activity: any): Promise<number> => {
		return ((await this.totalHours(activity)) / (await WorkFocusController.annualHours())) * 100;
	};
	static calcWorkload = async (activities: any): Promise<ISupervisionWorkload> => {
		try {
			// Use activity to calculate workload
			// const activity:any = await SupervisionActivity.findOne({ _id: mongoose.Types.ObjectId(activity._id) })
			//   .populate('user')
			//   .populate('duty')
			//   .populate('student');
			// if (!activity) {
			//   logger.error('Activity not found');
			// }
			if (!activities.length) {
				console.log('No Supervision Activities to calculate');
			}
			activities.map(async (activity: ISupervisionActivity) => {
				const workload: ISupervisionWorkload = {
					total: await SupervisionActivityController.totalHours(activity),
					percentageOfTeaching: await SupervisionActivityController.percentageOfTeaching(activity),
					percentageOfAnnual: await SupervisionActivityController.percentageOfAnnual(activity)
				};
				await SupervisionActivity.findByIdAndUpdate(
					{ _id: mongoose.Types.ObjectId(activity._id) },
					{
						$set: {
							workload: workload
						}
					},
					{ upsert: true }
				);
			});
			// for (let activity of activities) {
			//   const workload: ISupervisionWorkload = {
			//     total: await SupervisionActivityController.totalHours(activity),
			//     percentageOfTeaching: await SupervisionActivityController.percentageOfTeaching(activity),
			//     percentageOfAnnual: await SupervisionActivityController.percentageOfAnnual(activity)
			//   };
			//   // Update activity with workload
			//
			// }

			//logger.info('supervision workload updated');
		} catch (error) {
			logger.error(error);
			throw new Error(error);
		}
	};
}

export default SupervisionActivityController;

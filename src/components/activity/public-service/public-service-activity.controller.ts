/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */ import IPublicServiceActivity from './public-service-activity.interface';

import parameters from '../../../config/parameters.config';
import WorkFocusController from '../../work-focus/work-focus.controller';
import WorkloadController from '../../workload/workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import PublicServiceActivity from './public-service-activity.model';

const PublicServiceActivityController = {
	async all(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await PublicServiceActivity.find();
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
			const result = await PublicServiceActivity.findOne({ _id: req.params._id });
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
			const result = await PublicServiceActivity.findOne({ userId: req.params.userId });
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
			const newPublicServiceActivity = await new PublicServiceActivity(req.body).save();
			const result = await PublicServiceActivity.findOne({ _id: newPublicServiceActivity._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	},
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await PublicServiceActivity.findByIdAndUpdate(
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
			const result = await PublicServiceActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default PublicServiceActivityController;

// export default class PublicServiceActivityController {
//   public static async publicServiceActivity(activityId: string) {
//     return await PublicServiceActivity.findOne({ activityId: activityId })
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty');
//   }
//   public static async publicServiceActivities() {
//     return await PublicServiceActivity.find({})
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty');
//   }
//   public static async publicServiceActivitiesByUser(userId: string) {
//     return await PublicServiceActivity.find({ userId: userId })
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty');
//   }
//   public static async createPublicServiceActivity(
//     activity: IPublicServiceActivity
//   ) {
//     const newActivity = new PublicServiceActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updatePublicServiceActivity(
//     activity: IPublicServiceActivity
//   ) {
//     return await PublicServiceActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deletePublicServiceActivity(
//     activity: any
//   ) {
//     return await PublicServiceActivity.findOneAndRemove(activity);
//   }
//   public static async publicServiceGlobalTarrif() {
//     return parameters.global_public_service_tarrif;
//   }
//   public static async publicServiceTotalHoursPerActivity(activityId: string) {
//     const activity: IPublicServiceActivity = (await this.publicServiceActivity(
//       activityId
//     )) as IPublicServiceActivity;
//     const serviceHours = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     return serviceHours / 10;
//   }
//   public static async publicServiceTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.publicServiceGlobalTarrif();
//     const activities: IPublicServiceActivity[] = (await this.publicServiceActivitiesByUser(
//       userId
//     )) as IPublicServiceActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.publicServiceTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async publicServicePercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: IPublicServiceActivity = (await this.publicServiceActivity(
//       activityId
//     )) as IPublicServiceActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.publicServiceTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async publicServicePercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     const serviceHours: number = await WorkFocusController.serviceHours(userId);
//     const activityHours: number = await this.publicServiceTotalHoursPerUser(
//       userId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async publicServicePercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     const activityHours: number = await this.publicServiceTotalHoursPerActivity(
//       activityId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async publicServicePercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.publicServiceTotalHoursPerUser(
//       userId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async publicServicePercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IPublicServiceActivity = (await this.publicServiceActivity(
//       activityId
//     )) as IPublicServiceActivity;
//     const activityHours: number = await this.publicServiceTotalHoursPerActivity(
//       activityId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async publicServicePercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.publicServiceTotalHoursPerUser(
//       userId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }

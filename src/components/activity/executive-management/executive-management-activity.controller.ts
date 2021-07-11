import parameters from '../../../config/parameters.config';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import ExecutiveManagementActivity from './executive-management-activity.model';

const ExecutiveManagementActivityController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExecutiveManagementActivity.find();
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExecutiveManagementActivity.findOne({ _id: req.params._id });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExecutiveManagementActivity.findOne({ userId: req.params.userId });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newExecutiveManagementActivity = await new ExecutiveManagementActivity(req.body).save();
      const result = await ExecutiveManagementActivity.findOne({ _id: newExecutiveManagementActivity._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExecutiveManagementActivity.findByIdAndUpdate(
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
      const result = await ExecutiveManagementActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default ExecutiveManagementActivityController;

// export default class ExecutiveManagementActivityController {
//   public static async executiveManagementActivity(activityId: string) {
//     return await ExecutiveManagementActivity.findOne({ activityId: activityId })
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
//   public static async executiveManagementActivities() {
//     return await ExecutiveManagementActivity.find({})
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
//   public static async executiveManagementActivitiesByUser(userId: string) {
//     return await ExecutiveManagementActivity.find({ userId: userId })
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
//   public static async createExecutiveManagementActivity(
//     activity: IExecutiveManagementActivity
//   ) {
//     const newActivity = new ExecutiveManagementActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateExecutiveManagementActivity(
//     activity: IExecutiveManagementActivity
//   ) {
//     return await ExecutiveManagementActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deleteExecutiveManagementActivity(
//     activity: any
//   ) {
//     return await ExecutiveManagementActivity.findOneAndRemove(activity);
//   }

//   public static async executiveManagementGlobalTarrif() {
//     return parameters.global_executive_management_tarrif;
//   }
//   public static async executiveManagementTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
//       activityId
//     )) as IExecutiveManagementActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );

//     return serviceHours / 10;
//   }
//   public static async executiveManagementTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.executiveManagementGlobalTarrif();
//     const activities: IExecutiveManagementActivity[] = (await this.executiveManagementActivitiesByUser(
//       userId
//     )) as IExecutiveManagementActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.executiveManagementTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async executiveManagementPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
//       activityId
//     )) as IExecutiveManagementActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.executiveManagementTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async executiveManagementPercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     let globalTarrif: number = await this.executiveManagementGlobalTarrif();
//     let serviceHours: number = await WorkFocusController.serviceHours(userId);
//     let activityHours: number =
//       (await this.executiveManagementTotalHoursPerUser(userId)) + globalTarrif;
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async executiveManagementPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     let activityHours: number = await this.executiveManagementTotalHoursPerActivity(
//       activityId
//     );
//     let annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async executiveManagementPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
//       activityId
//     )) as IExecutiveManagementActivity;
//     const activityHours: number = await this.executiveManagementTotalHoursPerActivity(
//       activityId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async executiveManagementPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours = await this.executiveManagementTotalHoursPerUser(
//       userId
//     );
//     const annualHours = parameters.annual_total_hours;

//     return (activityHours / annualHours) * 100;
//   }
//   public static async executiveManagementPercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     const activityHours = await this.executiveManagementTotalHoursPerUser(
//       userId
//     );
//     const totalHours = await WorkloadController.totalHoursPerUser(userId);
//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }

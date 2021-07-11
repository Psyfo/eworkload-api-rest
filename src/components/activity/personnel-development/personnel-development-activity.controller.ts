import IPersonnelDevelopmentActivity from './personnel-development-activity.interface';

import parameters from '../../../config/parameters.config';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import PersonnelDevelopmentActivity from './personnel-development-activity.model';


const PersonnelDevelopmentActivityController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PersonnelDevelopmentActivity.find();
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
      const result = await PersonnelDevelopmentActivity.findOne({ _id: req.params._id });
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
      const result = await PersonnelDevelopmentActivity.findOne({ userId: req.params.userId });
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
      const newPersonnelDevelopmentActivity = await new PersonnelDevelopmentActivity(req.body).save();
      const result = await PersonnelDevelopmentActivity.findOne({ _id: newPersonnelDevelopmentActivity._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
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
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PersonnelDevelopmentActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default PersonnelDevelopmentActivityController;

// export default class PersonnelDevelopmentActivityController {
//   public static async personnelDevelopmentActivity(activityId: string) {
//     return await PersonnelDevelopmentActivity.findOne({
//       activityId: activityId
//     })
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
//   public static async personnelDevelopmentActivities() {
//     return await PersonnelDevelopmentActivity.find({})
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
//   public static async personnelDevelopmentActivitiesByUser(userId: string) {
//     return await PersonnelDevelopmentActivity.find({ userId: userId })
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
//   public static async createPersonnelDevelopmentActivity(
//     activity: IPersonnelDevelopmentActivity
//   ) {
//     const newActivity = new PersonnelDevelopmentActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updatePersonnelDevelopmentActivity(
//     activity: IPersonnelDevelopmentActivity
//   ) {
//     return await PersonnelDevelopmentActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deletePersonnelDevelopmentActivity(
//     activity: any
//   ) {
//     return await PersonnelDevelopmentActivity.findOneAndRemove(activity);
//   }
//   public static async personnelDevelopmentGlobalTarrif() {
//     return parameters.global_personnel_development_tarrif;
//   }
//   public static async personnelDevelopmentTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IPersonnelDevelopmentActivity = (await this.personnelDevelopmentActivity(
//       activityId
//     )) as IPersonnelDevelopmentActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );

//     return serviceHours / 10;
//   }
//   public static async personnelDevelopmentTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.personnelDevelopmentGlobalTarrif();
//     const activities: any[] = await this.personnelDevelopmentActivitiesByUser(
//       userId
//     );
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.personnelDevelopmentTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async personnelDevelopmentPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: IPersonnelDevelopmentActivity = (await this.personnelDevelopmentActivity(
//       activityId
//     )) as IPersonnelDevelopmentActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.personnelDevelopmentTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async personnelDevelopmentPercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     const globalTarrif: number = await this.personnelDevelopmentGlobalTarrif();
//     const serviceHours: number = await WorkFocusController.serviceHours(userId);
//     const activityHours: number =
//       (await this.personnelDevelopmentTotalHoursPerUser(userId)) + globalTarrif;

//     return (activityHours / serviceHours) * 100;
//   }
//   public static async personnelDevelopmentPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     const activityHours: number = await this.personnelDevelopmentTotalHoursPerActivity(
//       activityId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async personnelDevelopmentPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.personnelDevelopmentTotalHoursPerUser(
//       userId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async personnelDevelopmentPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: any = await this.personnelDevelopmentActivity(activityId);
//     const activityHours = await this.personnelDevelopmentTotalHoursPerActivity(
//       activityId
//     );
//     const totalHours = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async personnelDevelopmentPercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     let activityHours = await this.personnelDevelopmentTotalHoursPerUser(
//       userId
//     );
//     let totalHours = await WorkloadController.totalHoursPerUser(userId);
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }

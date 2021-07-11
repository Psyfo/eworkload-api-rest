import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import AcademicAdministrationActivity from './academic-administration-activity.model';

// export default class AcademicAdministrationActivityController {
//   public static async academicAdministrationActivity(activityId: string) {
//     return await AcademicAdministrationActivity.findOne({
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
//       .populate('duty')
//       .populate('qualification')
//       .orFail();
//   }
//   public static async academicAdministrationActivities() {
//     return await AcademicAdministrationActivity.find({})
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty')
//       .populate('qualification');
//   }
//   public static async academicAdministrationActivitiesByUser(userId: string) {
//     return await AcademicAdministrationActivity.find({ userId: userId })
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty')
//       .populate('qualification');
//   }
//   public static async createAcademicAdministrationActivity(
//     activity: IAcademicAdministrationActivity
//   ) {
//     const newActivity = new AcademicAdministrationActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateAcademicAdministrationActivity(
//     activity: IAcademicAdministrationActivity
//   ) {
//     return await AcademicAdministrationActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     ).orFail();
//   }
//   public static async deleteAcademicAdministrationActivity(
//     activity: any
//   ) {
//     return await AcademicAdministrationActivity.findOneAndRemove(
//       activity
//     ).orFail();
//   }
//   public static async academicAdministrationGlobalTarrif() {
//     return parameters.global_academic_administration_tarrif;
//   }
//   public static async academicAdministrationBase(activityId: string) {
//     const activity: IAcademicAdministrationActivity = (await this.academicAdministrationActivity(
//       activityId
//     )) as IAcademicAdministrationActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = serviceHours * 0.25;
//     return activityHours;
//   }
//   public static async academicAdministrationTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IAcademicAdministrationActivity = (await this.academicAdministrationActivity(
//       activityId
//     )) as IAcademicAdministrationActivity;
//     if (!activity) {
//       throw new Error('AA Activity is not defined');
//     }
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     return serviceHours / 10;
//   }
//   public static async academicAdministrationTotalHoursPerUser(userId: string) {
//     let globalTarrif: number = await this.academicAdministrationGlobalTarrif();
//     const activities: any[] = await this.academicAdministrationActivitiesByUser(
//       userId
//     );
//     let activityHours = 0;
//     for (let activity of activities) {
//       activityHours += await this.academicAdministrationTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async academicAdministrationPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     let activity: any = await this.academicAdministrationActivity(activityId);
//     let serviceHours = await WorkFocusController.serviceHours(activity.userId);
//     let activityHours = await this.academicAdministrationTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async academicAdministrationPercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     const serviceHours = await WorkFocusController.serviceHours(userId);
//     const activityHours = await this.academicAdministrationTotalHoursPerUser(
//       userId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async academicAdministrationPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     let activityHours = await this.academicAdministrationTotalHoursPerActivity(
//       activityId
//     );
//     let annualHours = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async academicAdministrationPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours = await this.academicAdministrationTotalHoursPerUser(
//       userId
//     );
//     const annualHours = parameters.annual_total_hours;

//     return (activityHours / annualHours) * 100;
//   }
//   public static async academicAdministrationPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IAcademicAdministrationActivity = (await this.academicAdministrationActivity(
//       activityId
//     )) as IAcademicAdministrationActivity;
//     const activityHours = await this.academicAdministrationTotalHoursPerActivity(
//       activityId
//     );
//     const totalHours = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );

//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async academicAdministrationPercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     let activityHours = await this.academicAdministrationTotalHoursPerUser(
//       userId
//     );
//     let totalHours = await WorkloadController.totalHoursPerUser(userId);
//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }

const AcademicAdministrationActivityController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AcademicAdministrationActivity.find();
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
      const result = await AcademicAdministrationActivity.findOne({ _id: req.params._id });
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
      const result = await AcademicAdministrationActivity.findOne({ userId: req.params.userId });
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

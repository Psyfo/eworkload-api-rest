import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import WorkFocusController from '../../work-focus/work-focus.controller';
import { ISupervisionWorkload } from '../../workload/supervision/supervision-workload.interface';
import SupervisionActivity from './supervision-activity.model';


const SupervisionActivityController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SupervisionActivity.find().populate('user').populate('student');
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
      const result = await (await SupervisionActivity.findOne({ _id: mongoose.Types.ObjectId(req.params._id) })).populate('user').populate('student');
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      await SupervisionActivityController.calcWorkload(result._id)
      logger.info('Request successful');

      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SupervisionActivity.findOne({ userId: req.params.userId });
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
      const newSupervisionActivity = await new SupervisionActivity(req.body).save();
      const result = await SupervisionActivity.findOne({ _id: newSupervisionActivity._id });
      logger.info('Object created');
       //update workload
       await this.calcWorkload(result._id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
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
      await SupervisionActivityController.calcWorkload(result._id)
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
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
  }, 
  async totalHours(activity: any) {
    let totalHours: number = 100;
    if (activity.split !== 100) {
      totalHours *= activity.split / 100;
    }
    
    return totalHours;
  },
  async percentageOfTeaching(activity: any) {
    return (await this.totalHours(activity)) / (await WorkFocusController.teachingHours(activity.userId));
  },
  async percentageOfAnnual(activity: any) {
    return (await this.totalHours(activity)) / (await WorkFocusController.annualHours());
  },
  async calcWorkload(_id: string){
    
    try {
      // Use activity to calculate workload
      const activity = await SupervisionActivity.findOne({ _id: mongoose.Types.ObjectId(_id) }).populate('user').populate('duty').populate('student');
      if (!activity) {
        logger.error('Activity not found');
      }
      const workload: ISupervisionWorkload = {
        total: await SupervisionActivityController.totalHours(activity),
        percentageOfTeaching: await SupervisionActivityController.percentageOfTeaching(activity),
        percentageOfAnnual: await SupervisionActivityController.percentageOfAnnual(activity)
      };

      // Update activity with workload
      await SupervisionActivity.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(activity._id) },
        {
          $set: {
            workload: workload
          }
        },
        { upsert: true }
      );
      logger.info('supervision workload updated');
    } catch (error) {
      logger.error(error);
    }
  }
};

export default SupervisionActivityController;

// export default class SupervisionActivityController {
//   public static async supervisionActivity(activityId: string) {
//     return await SupervisionActivity.findOne({ activityId: activityId })
//       .populate('user')
//       .populate('duty')
//       .populate('student');
//   }
//   public static async supervisionActivities() {
//     return await SupervisionActivity.find({})
//       .populate('user')
//       .populate('duty')
//       .populate('student');
//   }
//   public static async supervisionActivitiesByUser(userId: string) {
//     return await SupervisionActivity.find({ userId: userId })
//       .populate('user')
//       .populate('duty')
//       .populate('student');
//   }
//   public static async createSupervisionActivity(
//     activity: ISupervisionActivity
//   ) {
//     const newActivity = new SupervisionActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateSupervisionActivity(
//     activity: ISupervisionActivity
//   ) {
//     return await SupervisionActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deleteSupervisionActivity(
//     activity: any
//   ) {
//     return await SupervisionActivity.findOneAndRemove(activity);
//   }
//   public static async supervisionTotalHoursPerActivity(activityId: string) {
//     const activity: ISupervisionActivity = (await this.supervisionActivity(
//       activityId
//     )) as ISupervisionActivity;

//     let totalHours: number = 100;
//     if (activity.split !== 100) {
//       totalHours *= activity.split / 100;
//     }
//     return totalHours;
//   }
//   public static async supervisionTotalHoursPerUser(userId: string) {
//     const activities: ISupervisionActivity[] = (await this.supervisionActivitiesByUser(
//       userId
//     )) as ISupervisionActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.supervisionTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours;
//   }
//   public static async supervisionPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     let activity: ISupervisionActivity = (await this.supervisionActivity(
//       activityId
//     )) as ISupervisionActivity;
//     let serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     let activityHours: number = await this.supervisionTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async supervisionPercentageOfWorkFocusPerUser(userId: string) {
//     let teachingHours: number = await WorkFocusController.teachingHours(userId);
//     let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
//     return (activityHours / teachingHours) * 100;
//   }
//   public static async supervisionPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     let activityHours: number = await this.supervisionTotalHoursPerActivity(
//       activityId
//     );
//     let annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async supervisionPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
//     let annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async supervisionPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     let activity: ISupervisionActivity = (await this.supervisionActivity(
//       activityId
//     )) as ISupervisionActivity;
//     let activityHours: number = 0;
//     activityHours = await this.supervisionTotalHoursPerActivity(activityId);
//     let totalHours: number = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async supervisionPercentageOfTotalHoursPerUser(userId: string) {
//     let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
//     let totalHours: number = await WorkloadController.totalHoursPerUser(userId);
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }

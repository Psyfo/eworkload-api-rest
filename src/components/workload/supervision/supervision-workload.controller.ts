import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import { ISupervisionWorkload } from './supervision-workload.interface';
import SupervisionWorkload from './supervision-workload.model';

// import SupervisionController from '../../activity/supervision/supervision-workload.controller';

const SupervisionWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SupervisionWorkload.find();
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
      const result = await SupervisionWorkload.findOne({ _id: req.params._id });
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
      const result = await SupervisionWorkload.findOne({ userId: req.params.userId });
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
      const newSupervisionWorkload = await new SupervisionWorkload(req.body).save();
      const result = await SupervisionWorkload.findOne({ _id: newSupervisionWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SupervisionWorkload.findByIdAndUpdate(
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
      const result = await SupervisionWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
  async initializeWorkload(userId: string) {
    const workload = new SupervisionWorkload({ userId: userId });
    return await workload.save();
  }
};

export default SupervisionWorkloadController;

// export default class SupervisionWorkloadController {
//   public static async initializeSWorkload(userId: string) {
//     const sWorkload: ISupervisionWorkload = new SupervisionWorkload({
//       userId: userId
//     }) as ISupervisionWorkload;
//     return await sWorkload.save();
//   }
//   public static async supervisionWorkload(userId: string) {
//     return await SupervisionWorkload.findOne({
//       userId: userId
//     }).orFail();
//   }
//   public static async calculateSupervisionWorkload(userId: string) {
//     const supervisionWorkloads: ISupervisionWorkloadPerActivity[] = [];
//     const activities: ISupervisionActivity[] = (await SupervisionActivity.find({
//       userId: userId
//     })) as ISupervisionActivity[];

//     for (let activity of activities) {
//       const supervisionTotalHoursPerActivity: number = await SupervisionController.supervisionTotalHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfWorkFocusPerActivity: number = await SupervisionController.supervisionPercentageOfWorkFocusPerActivity(
//         activity.activityId
//       );
//       const percentageOfAnnualHoursPerActivity: number = await SupervisionController.supervisionPercentageOfAnnualHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfTotalHoursPerActivity: number = await SupervisionController.supervisionPercentageOfTotalHoursPerActivity(
//         activity.activityId
//       );
//       supervisionWorkloads.push({
//         activity: activity,
//         totalHoursPerActivity: supervisionTotalHoursPerActivity,
//         percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//         percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//         percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//       });
//     }
//     const totalHoursPerUser = await SupervisionController.supervisionTotalHoursPerUser(
//       userId
//     );
//     const percentageOfWorkFocusPerUser = await SupervisionController.supervisionPercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser = await SupervisionController.supervisionPercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser = await SupervisionController.supervisionPercentageOfTotalHoursPerUser(
//       userId
//     );

//     const supervisionWorkload: ISupervisionWorkload = new SupervisionWorkload({
//       userId: userId,
//       supervisionWorkloads: supervisionWorkloads,
//       totalHoursPerUser: totalHoursPerUser,
//       percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//       percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//       percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//     }) as ISupervisionWorkload;

//     return await supervisionWorkload.save();
//   }
//   public static async deleteSupervisionWorkload(userId: string) {
//     return await SupervisionWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

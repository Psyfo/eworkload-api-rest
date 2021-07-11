import IExecutiveManagementWorkload, {
  IExecutiveManagementWorkloadPerActivity
} from './executive-management-workload.interface';

// import ExecutiveManagementController from '../../activity/community-instruction/community-instruction-workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import ExecutiveManagementWorkload from './executive-management-workload.model';

const ExecutiveManagementWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExecutiveManagementWorkload.find();
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
      const result = await ExecutiveManagementWorkload.findOne({ _id: req.params._id });
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
      const result = await ExecutiveManagementWorkload.findOne({ userId: req.params.userId });
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
      const newExecutiveManagementWorkload = await new ExecutiveManagementWorkload(req.body).save();
      const result = await ExecutiveManagementWorkload.findOne({ _id: newExecutiveManagementWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExecutiveManagementWorkload.findByIdAndUpdate(
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
      const result = await ExecutiveManagementWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default ExecutiveManagementWorkloadController

// export default class ExecutiveManagementWorkloadController {
//   public static async initializeEMWorkload(userId: string) {
//     const emWorkload: IExecutiveManagementWorkload = new ExecutiveManagementWorkload({
//       userId: userId
//     }) as IExecutiveManagementWorkload;
//     return await emWorkload.save();
//   }
//   public static async executiveManagementWorkload(userId: string) {
//     return await ExecutiveManagementWorkload.findOne({
//       userId: userId
//     });
//   }
//   public static async calculateExecutiveManagementWorkload(userId: string) {
//     const executiveManagementWorkloads: IExecutiveManagementWorkloadPerActivity[] = [];
//     const activities: IExecutiveManagementActivity[] = (await ExecutiveManagementActivity.find({
//       userId: userId
//     })) as IExecutiveManagementActivity[];

//     for (let activity of activities) {
//       const executiveManagementTotalHoursPerActivity: number = await ExecutiveManagementController.executiveManagementTotalHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfWorkFocusPerActivity: number = await ExecutiveManagementController.executiveManagementPercentageOfWorkFocusPerActivity(
//         activity.activityId
//       );
//       const percentageOfAnnualHoursPerActivity: number = await ExecutiveManagementController.executiveManagementPercentageOfAnnualHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfTotalHoursPerActivity: number = await ExecutiveManagementController.executiveManagementPercentageOfTotalHoursPerActivity(
//         activity.activityId
//       );
//       executiveManagementWorkloads.push({
//         activity: activity,
//         totalHoursPerActivity: executiveManagementTotalHoursPerActivity,
//         percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//         percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//         percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//       });
//     }
//     const globalTarrif = await ExecutiveManagementController.executiveManagementGlobalTarrif();
//     const totalHoursPerUser = await ExecutiveManagementController.executiveManagementTotalHoursPerUser(userId);
//     const percentageOfWorkFocusPerUser = await ExecutiveManagementController.executiveManagementPercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser = await ExecutiveManagementController.executiveManagementPercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser = await ExecutiveManagementController.executiveManagementPercentageOfTotalHoursPerUser(
//       userId
//     );

//     const executiveManagementWorkload: IExecutiveManagementWorkload = new ExecutiveManagementWorkload({
//       userId: userId,
//       executiveManagementWorkloads: executiveManagementWorkloads,
//       globalTarrif: globalTarrif,
//       totalHoursPerUser: totalHoursPerUser,
//       percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//       percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//       percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//     }) as IExecutiveManagementWorkload;

//     return await executiveManagementWorkload.save();
//   }
//   public static async deleteExecutiveManagementWorkload(userId: string) {
//     return await ExecutiveManagementWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

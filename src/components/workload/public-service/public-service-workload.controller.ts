import IPublicServiceWorkload, {
  IPublicServiceWorkloadPerActivity
} from './public-service-workload.interface';

// import PublicServiceController from '../../activity/public-service/public-service-workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import PublicServiceWorkload from './public-service-workload.model';

const PublicServiceWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PublicServiceWorkload.find();
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
      const result = await PublicServiceWorkload.findOne({ _id: req.params._id });
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
      const result = await PublicServiceWorkload.findOne({ userId: req.params.userId });
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
      const newPublicServiceWorkload = await new PublicServiceWorkload(req.body).save();
      const result = await PublicServiceWorkload.findOne({ _id: newPublicServiceWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PublicServiceWorkload.findByIdAndUpdate(
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
      const result = await PublicServiceWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
    const workload: IPublicServiceWorkload =  new PublicServiceWorkload({ userId: userId });
    return await workload.save()
 },
};

export default PublicServiceWorkloadController

// export default class PublicServiceWorkloadController {
//   public static async initializePSWorkload(userId: string) {
//     const psWorkload: IPublicServiceWorkload = new PublicServiceWorkload({
//       userId: userId
//     }) as IPublicServiceWorkload;
//     return await psWorkload.save();
//   }
//   public static async publicServiceWorkload(userId: string) {
//     return await PublicServiceWorkload.findOne({
//       userId: userId
//     });
//   }
//   public static async calculatePublicServiceWorkload(userId: string) {
//     const publicServiceWorkloads: IPublicServiceWorkloadPerActivity[] = [];
//     const activities: IPublicServiceActivity[] = (await PublicServiceActivity.find({
//       userId: userId
//     })) as IPublicServiceActivity[];

//     for (let activity of activities) {
//       const publicServiceTotalHoursPerActivity: number = await PublicServiceController.publicServiceTotalHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfWorkFocusPerActivity: number = await PublicServiceController.publicServicePercentageOfWorkFocusPerActivity(
//         activity.activityId
//       );
//       const percentageOfAnnualHoursPerActivity: number = await PublicServiceController.publicServicePercentageOfAnnualHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfTotalHoursPerActivity: number = await PublicServiceController.publicServicePercentageOfTotalHoursPerActivity(
//         activity.activityId
//       );
//       publicServiceWorkloads.push({
//         activity: activity,
//         totalHoursPerActivity: publicServiceTotalHoursPerActivity,
//         percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//         percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//         percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//       });
//     }
//     const globalTarrif = await PublicServiceController.publicServiceGlobalTarrif();
//     const totalHoursPerUser = await PublicServiceController.publicServiceTotalHoursPerUser(userId);
//     const percentageOfWorkFocusPerUser = await PublicServiceController.publicServicePercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser = await PublicServiceController.publicServicePercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser = await PublicServiceController.publicServicePercentageOfTotalHoursPerUser(
//       userId
//     );

//     const publicServiceWorkload: IPublicServiceWorkload = new PublicServiceWorkload({
//       userId: userId,
//       publicServiceWorkloads: publicServiceWorkloads,
//       globalTarrif: globalTarrif,
//       totalHoursPerUser: totalHoursPerUser,
//       percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//       percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//       percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//     }) as IPublicServiceWorkload;

//     return await publicServiceWorkload.save();
//   }
//   public static async deletePublicServiceWorkload(userId: string) {
//     return await PublicServiceWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

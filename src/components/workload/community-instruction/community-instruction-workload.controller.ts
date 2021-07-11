import ICommunityInstructionWorkload, {
  ICommunityInstructionWorkloadPerActivity
} from './community-instruction-workload.interface';

// import CommunityInstructionController from '../../activity/community-instruction/community-instruction-workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import CommunityInstructionWorkload from './community-instruction-workload.model';

const CommunityInstructionWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommunityInstructionWorkload.find();
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
      const result = await CommunityInstructionWorkload.findOne({ _id: req.params._id });
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
      const result = await CommunityInstructionWorkload.findOne({ userId: req.params.userId });
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
      const newCommunityInstructionWorkload = await new CommunityInstructionWorkload(req.body).save();
      const result = await CommunityInstructionWorkload.findOne({ _id: newCommunityInstructionWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommunityInstructionWorkload.findByIdAndUpdate(
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
      const result = await CommunityInstructionWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
    const workload: ICommunityInstructionWorkload =  new CommunityInstructionWorkload({ userId: userId });
    return await workload.save()
 },
};

export default CommunityInstructionWorkloadController;

// export default class CommunityInstructionWorkloadController {
//   public static async initializeCIWorkload(userId: string) {
//     const ciWorkload: ICommunityInstructionWorkload = new CommunityInstructionWorkload({
//       userId: userId
//     }) as ICommunityInstructionWorkload;
//     return await ciWorkload.save();
//   }
//   public static async communityInstructionWorkload(userId: string) {
//     return await CommunityInstructionWorkload.findOne({
//       userId: userId
//     });
//   }
//   public static async calculateCommunityInstructionWorkload(userId: string) {
//     let communityInstructionWorkloads: ICommunityInstructionWorkloadPerActivity[] = [];
//     const activities: ICommunityInstructionWorkload[] = (await CommunityInstructionWorkload.find({
//       userId: userId
//     })) as ICommunityInstructionWorkload[];

//     for (let activity of activities) {
//       let communityInstructionTotalHoursPerActivity: number = await CommunityInstructionController.communityInstructionTotalHoursPerActivity(
//         activity.activityId
//       );
//       let percentageOfWorkFocusPerActivity: number = await CommunityInstructionController.communityInstructionPercentageOfWorkFocusPerActivity(
//         activity.activityId
//       );
//       let percentageOfAnnualHoursPerActivity: number = await CommunityInstructionController.communityInstructionPercentageOfAnnualHoursPerActivity(
//         activity.activityId
//       );
//       let percentageOfTotalHoursPerActivity: number = await CommunityInstructionController.communityInstructionPercentageOfTotalHoursPerActivity(
//         activity.activityId
//       );
//       communityInstructionWorkloads.push({
//         activity: activity,
//         totalHoursPerActivity: communityInstructionTotalHoursPerActivity,
//         percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//         percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//         percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//       });
//     }
//     const globalTarrif: number = await CommunityInstructionController.communityInstructionGlobalTarrif();
//     const totalHoursPerUser: number = await CommunityInstructionController.communityInstructionTotalHoursPerUser(
//       userId
//     );
//     const percentageOfWorkFocusPerUser: number = await CommunityInstructionController.communityInstructionPercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser: number = await CommunityInstructionController.communityInstructionPercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser: number = await CommunityInstructionController.communityInstructionPercentageOfTotalHoursPerUser(
//       userId
//     );

//     const communityInstructionWorkload: ICommunityInstructionWorkload = new CommunityInstructionWorkload({
//       userId: userId,
//       communityInstructionWorkloads: communityInstructionWorkloads,
//       globalTarrif: globalTarrif,
//       totalHoursPerUser: totalHoursPerUser,
//       percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//       percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//       percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//     }) as ICommunityInstructionWorkload;

//     return await communityInstructionWorkload.save();
//   }
//   public static async deleteCommunityInstructionWorkload(userId: string) {
//     return await CommunityInstructionWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

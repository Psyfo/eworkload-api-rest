import IResearchWorkload, { IResearchWorkloadPerActivity } from './research-workload.interface';

// import ResearchController from '../../activity/research/research-workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import ResearchWorkload from './research-workload.model';

const ResearchWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ResearchWorkload.find();
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
      const result = await ResearchWorkload.findOne({ _id: req.params._id });
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
      const result = await ResearchWorkload.findOne({ userId: req.params.userId });
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
      const newResearchWorkload = await new ResearchWorkload(req.body).save();
      const result = await ResearchWorkload.findOne({ _id: newResearchWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ResearchWorkload.findByIdAndUpdate(
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
      const result = await ResearchWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
    const workload: IResearchWorkload =  new ResearchWorkload({ userId: userId });
    return await workload.save()
 },
};

export default ResearchWorkloadController;

// export default class ResearchWorkloadController {
//   public static async initializeRWorkload(userId: string) {
//     const rWorkload: IResearchWorkload = new ResearchWorkload({
//       userId: userId
//     }) as IResearchWorkload;
//     return await rWorkload.save();
//   }
//   public static async researchWorkload(userId: string) {
//     return await ResearchWorkload.findOne({
//       userId: userId
//     }).orFail();
//   }
//   public static async calculateResearchWorkload(userId: string) {
//     const researchWorkloads: IResearchWorkloadPerActivity[] = [];
//     const activities: IResearchActivity[] = (await ResearchActivity.find({
//       userId: userId
//     })) as IResearchActivity[];

//     for (let activity of activities) {
//       const researchTotalHoursPerActivity: number = await ResearchController.researchTotalHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfWorkFocusPerActivity: number = await ResearchController.researchPercentageOfWorkFocusPerActivity(
//         activity.activityId
//       );
//       const percentageOfAnnualHoursPerActivity: number = await ResearchController.researchPercentageOfAnnualHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfTotalHoursPerActivity: number = await ResearchController.researchPercentageOfTotalHoursPerActivity(
//         activity.activityId
//       );
//       researchWorkloads.push({
//         activity: activity,
//         totalHoursPerActivity: researchTotalHoursPerActivity,
//         percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//         percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//         percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//       });
//     }
//     const globalTarrif = await ResearchController.researchGlobalTarrif();
//     const totalHoursPerUser = await ResearchController.researchTotalHoursPerUser(
//       userId
//     );
//     const percentageOfWorkFocusPerUser = await ResearchController.researchPercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser = await ResearchController.researchPercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser = await ResearchController.researchPercentageOfTotalHoursPerUser(
//       userId
//     );

//     const researchWorkload: IResearchWorkload = new ResearchWorkload({
//       userId: userId,
//       researchWorkloads: researchWorkloads,
//       globalTarrif: globalTarrif,
//       totalHoursPerUser: totalHoursPerUser,
//       percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//       percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//       percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//     }) as IResearchWorkload;

//     return await researchWorkload.save();
//   }
//   public static async deleteResearchWorkload(userId: string) {
//     return await ResearchWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

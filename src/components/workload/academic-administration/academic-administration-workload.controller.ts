import IAcademicAdministrationWorkload, {
  IAcademicAdministrationWorkloadPerActivity
} from './academic-administration-workload.interface';

// import AcademicAdministrationController from '../../activity/academic-administration/academic-administration-workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import AcademicAdministrationWorkload from './academic-administration-workload.model';

const AcademicAdministrationWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AcademicAdministrationWorkload.find();
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
      const result = await AcademicAdministrationWorkload.findOne({ _id: req.params._id });
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
      const result = await AcademicAdministrationWorkload.findOne({ userId: req.params.userId });
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
      const newAcademicAdministrationWorkload = await new AcademicAdministrationWorkload(req.body).save();
      const result = await AcademicAdministrationWorkload.findOne({ _id: newAcademicAdministrationWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AcademicAdministrationWorkload.findByIdAndUpdate(
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
      const result = await AcademicAdministrationWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
    const workload: IAcademicAdministrationWorkload = new AcademicAdministrationWorkload({ userId: userId });
    return await workload.save();
  }
};

export default AcademicAdministrationWorkloadController;

// export default class AcademicAdministrationWorkloadController {
//   public static async initializeAAWorkload(userId: string) {
//     const workload: IAcademicAdministrationWorkload = new AcademicAdministrationWorkload({
//       userId: userId
//     }) as IAcademicAdministrationWorkload;
//     return await workload.save();
//   }
//   public static async academicAdministrationWorkload(userId: string) {
//     return await AcademicAdministrationWorkload.findOne({
//       userId: userId
//     });
//   }
//   public static async calculateAcademicAdministrationWorkload(userId: string) {
//     let academicAdministrationWorkloads: IAcademicAdministrationWorkloadPerActivity[] = [];
//     let activities: IAcademicAdministrationActivity[] = (await AcademicAdministrationController.academicAdministrationActivitiesByUser(
//       userId
//     )) as IAcademicAdministrationActivity[];

//     // Iterate through activities to calculate per-activity workloads
//     if (activities) {
//       for (let activity of activities) {
//         const academicAdministrationTotalHoursPerActivity: number = await AcademicAdministrationController.academicAdministrationTotalHoursPerActivity(
//           activity.activityId
//         );
//         const percentageOfWorkFocusPerActivity: number = await AcademicAdministrationController.academicAdministrationPercentageOfWorkFocusPerActivity(
//           activity.activityId
//         );
//         const percentageOfAnnualHoursPerActivity: number = await AcademicAdministrationController.academicAdministrationPercentageOfAnnualHoursPerActivity(
//           activity.activityId
//         );
//         const percentageOfTotalHoursPerActivity: number = await AcademicAdministrationController.academicAdministrationPercentageOfTotalHoursPerActivity(
//           activity.activityId
//         );

//         await academicAdministrationWorkloads.push({
//           activity: activity,
//           totalHoursPerActivity: academicAdministrationTotalHoursPerActivity,
//           percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//           percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//           percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//         });
//       }
//     }
//     const globalTarrif: number = await AcademicAdministrationController.academicAdministrationGlobalTarrif();
//     const totalHoursPerUser: number = await AcademicAdministrationController.academicAdministrationTotalHoursPerUser(
//       userId
//     );
//     const percentageOfWorkFocusPerUser: number = await AcademicAdministrationController.academicAdministrationPercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser: number = await AcademicAdministrationController.academicAdministrationPercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser: number = await AcademicAdministrationController.academicAdministrationPercentageOfTotalHoursPerUser(
//       userId
//     );

//     const academicAdministrationWorkload: IAcademicAdministrationWorkload = new AcademicAdministrationWorkload({
//       userId: userId,
//       academicAdministrationWorkloads: academicAdministrationWorkloads,
//       globalTarrif: globalTarrif,
//       totalHoursPerUser: totalHoursPerUser,
//       percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//       percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//       percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//     }) as IAcademicAdministrationWorkload;

//     return await academicAdministrationWorkload.save();
//   }
//   public static async deleteAcademicAdministrationWorkload(userId: string) {
//     return await AcademicAdministrationWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

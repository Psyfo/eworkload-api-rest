import IPersonnelDevelopmentWorkload, {
  IPersonnelDevelopmentWorkloadPerActivity
} from './personnel-development-workload.interface';

// import PersonnelDevelopmentController from '../../activity/personnel-development/personnel-development-workload.controller';

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import PersonnelDevelopmentWorkload from './personnel-development-workload.model';

const PersonnelDevelopmentWorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PersonnelDevelopmentWorkload.find();
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
      const result = await PersonnelDevelopmentWorkload.findOne({ _id: req.params._id });
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
      const result = await PersonnelDevelopmentWorkload.findOne({ userId: req.params.userId });
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
      const newPersonnelDevelopmentWorkload = await new PersonnelDevelopmentWorkload(req.body).save();
      const result = await PersonnelDevelopmentWorkload.findOne({ _id: newPersonnelDevelopmentWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PersonnelDevelopmentWorkload.findByIdAndUpdate(
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
      const result = await PersonnelDevelopmentWorkload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
    const workload: IPersonnelDevelopmentWorkload = new PersonnelDevelopmentWorkload({ userId: userId });
    return await workload.save();
  }
};

export default PersonnelDevelopmentWorkloadController;

// export default class PersonnelDevelopmentWorkloadController {
//   public static async initializePDWorkload(userId: string) {
//     const pdWorkload: IPersonnelDevelopmentWorkload = new PersonnelDevelopmentWorkload(
//       {
//         userId: userId
//       }
//     ) as IPersonnelDevelopmentWorkload;
//     return await pdWorkload.save();
//   }
//   public static async personnelDevelopmentWorkload(userId: string) {
//     return await PersonnelDevelopmentWorkload.findOne({
//       userId: userId
//     }).orFail();
//   }
//   public static async calculatePersonnelDevelopmentWorkload(userId: string) {
//     const personnelDevelopmentWorkloads: IPersonnelDevelopmentWorkloadPerActivity[] = [];
//     const activities: IPersonnelDevelopmentActivity[] = (await PersonnelDevelopmentActivity.find(
//       {
//         userId: userId
//       }
//     )) as IPersonnelDevelopmentActivity[];

//     for (let activity of activities) {
//       const personnelDevelopmentTotalHoursPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentTotalHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfWorkFocusPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfWorkFocusPerActivity(
//         activity.activityId
//       );
//       const percentageOfAnnualHoursPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfAnnualHoursPerActivity(
//         activity.activityId
//       );
//       const percentageOfTotalHoursPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfTotalHoursPerActivity(
//         activity.activityId
//       );
//       personnelDevelopmentWorkloads.push({
//         activity: activity,
//         totalHoursPerActivity: personnelDevelopmentTotalHoursPerActivity,
//         percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
//         percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
//         percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
//       });
//     }
//     const globalTarrif = await PersonnelDevelopmentController.personnelDevelopmentGlobalTarrif();
//     const totalHoursPerUser = await PersonnelDevelopmentController.personnelDevelopmentTotalHoursPerUser(
//       userId
//     );
//     const percentageOfWorkFocusPerUser = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfWorkFocusPerUser(
//       userId
//     );
//     const percentageOfAnnualHoursPerUser = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfAnnualHoursPerUser(
//       userId
//     );
//     const percentageOfTotalHoursPerUser = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfTotalHoursPerUser(
//       userId
//     );

//     const personnelDevelopmentWorkload: IPersonnelDevelopmentWorkload = new PersonnelDevelopmentWorkload(
//       {
//         userId: userId,
//         personnelDevelopmentWorkloads: personnelDevelopmentWorkloads,
//         globalTarrif: globalTarrif,
//         totalHoursPerUser: totalHoursPerUser,
//         percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
//         percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
//         percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
//       }
//     ) as IPersonnelDevelopmentWorkload;

//     return await personnelDevelopmentWorkload.save();
//   }
//   public static async deletePersonnelDevelopmentWorkload(userId: string) {
//     return await PersonnelDevelopmentWorkload.findOneAndRemove({
//       userId: userId
//     });
//   }
// }

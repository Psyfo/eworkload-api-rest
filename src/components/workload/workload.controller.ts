import mongoose from 'mongoose';
import IUser from '../user/user.interface';
import IAcademicAdministrationWorkload from './academic-administration/academic-administration-workload.interface';
import ICommunityInstructionWorkload from './community-instruction/community-instruction-workload.interface';
import IExecutiveManagementWorkload from './executive-management/executive-management-workload.interface';
import IFormalInstructionWorkload from './formal-instruction/formal-instruction-workload.interface';
import IPersonnelDevelopmentWorkload from './personnel-development/personnel-development-workload.interface';
import IPublicServiceWorkload from './public-service/public-service-workload.interface';
import IResearchWorkload from './research/research-workload.interface';
import IWorkload from './supervision/supervision-workload.interface';

import { logger } from '../../config/logger.config';
import AcademicAdministrationActivityController from '../activity/academic-administration/academic-administration-activity.controller';
import CommunityInstructionActivityController from '../activity/community-instruction/community-instruction-activity.controller';
import ExecutiveManagementActivityController from '../activity/executive-management/executive-management-activity.controller';
import FormalInstructionActivityController from '../activity/formal-instruction/formal-instruction-activity.controller';
import PersonnelDevelopmentActivityController from '../activity/personnel-development/personnel-development-activity.controller';
import PublicServiceActivityController from '../activity/public-service/public-service-activity.controller';
import ResearchActivityController from '../activity/research/research-activity.controller';
import SupervisionActivityController from '../activity/supervision/supervision-activity.controller';
import UserController from '../user/user.controller';
import WorkFocusController from '../work-focus/work-focus.controller';
import AcademicAdministrationWorkloadController from './academic-administration/academic-administration-workload.controller';
import CommunityInstructionWorkloadController from './community-instruction/community-instruction-workload.controller';
import ExecutiveManagementWorkloadController from './executive-management/executive-management-workload.controller';
import FormalInstructionWorkloadController from './formal-instruction/formal-instruction-workload.controller';
import PersonnelDevelopmentWorkloadController from './personnel-development/personnel-development-workload.controller';
import PublicServiceWorkloadController from './public-service/public-service-workload.controller';
import ResearchWorkloadController from './research/research-workload.controller';
import { NextFunction, Request } from 'express';
import { Response } from 'express';
import Workload from './workload.model';

const WorkloadController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Workload.find();
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
      const result = await Workload.findOne({ _id: req.params._id });
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
      const result = await Workload.findOne({ userId: req.params.userId });
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
      const newWorkload = await new Workload(req.body).save();
      const result = await Workload.findOne({ _id: newWorkload._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Workload.findByIdAndUpdate(
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
      const result = await Workload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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
  async totalHours(req: Request, res: Response, next: NextFunction) {},
  async teachingHours(req: Request, res: Response, next: NextFunction) {},
  async serviceHours(req: Request, res: Response, next: NextFunction) {},
  async researchHours(req: Request, res: Response, next: NextFunction) {},
  async initiliazeWorkloads(req: Request, res: Response, next: NextFunction) {},
  async deleteWorkloads(req: Request, res: Response, next: NextFunction) {},
  async totalWorkload(req: Request, res: Response, next: NextFunction) {},
  async workloadSummaries(req: Request, res: Response, next: NextFunction) {},
  async calculateTotalWorkload(userId: string) {}
};

export default WorkloadController;

// export default class WorkloadController {
//   public static async totalHoursPerUser(userId: any) {
//     const aaHours: number = await AcademicAdministrationActivityController.academicAdministrationTotalHoursPerUser(
//       userId
//     );
//     const ciHours: number = await CommunityInstructionActivityController.communityInstructionTotalHoursPerUser(
//       userId
//     );
//     const emHours: number = await ExecutiveManagementActivityController.executiveManagementTotalHoursPerUser(
//       userId
//     );
//     const fiHours: number = await FormalInstructionActivityController.formalInstructionTotalHoursPerUser(
//       userId
//     );
//     const pdHours: number = await PersonnelDevelopmentActivityController.personnelDevelopmentTotalHoursPerUser(
//       userId
//     );
//     const psHours: number = await PublicServiceActivityController.publicServiceTotalHoursPerUser(
//       userId
//     );
//     const rHours: number = await ResearchActivityController.researchTotalHoursPerUser(
//       userId
//     );
//     const sHours: number = await SupervisionActivityController.supervisionTotalHoursPerUser(
//       userId
//     );
//     let total: number = 0;
//     try {
//       total =
//         aaHours +
//         ciHours +
//         emHours +
//         fiHours +
//         pdHours +
//         psHours +
//         rHours +
//         sHours;
//     } catch (error) {
//       logger.error(error);
//     }
//     return total;
//   }
//   public static async teachingHoursPerUser(userId: string) {
//     const fiHours: number = await FormalInstructionActivityController.formalInstructionTotalHoursPerUser(
//       userId
//     );
//     const sHours: number = await SupervisionActivityController.supervisionTotalHoursPerUser(
//       userId
//     );
//     const total: number = fiHours + sHours;
//     return total;
//   }
//   public static async researchHoursPerUser(userId: string) {
//     const rHours: number = await ResearchActivityController.researchTotalHoursPerUser(
//       userId
//     );
//     const total: number = rHours;
//     return total;
//   }
//   public static async serviceHoursPerUser(userId: string) {
//     const aaHours: number = await AcademicAdministrationActivityController.academicAdministrationTotalHoursPerUser(
//       userId
//     );
//     const ciHours: number = await CommunityInstructionActivityController.communityInstructionTotalHoursPerUser(
//       userId
//     );
//     const emHours: number = await ExecutiveManagementActivityController.executiveManagementTotalHoursPerUser(
//       userId
//     );
//     const pdHours: number = await PersonnelDevelopmentActivityController.personnelDevelopmentTotalHoursPerUser(
//       userId
//     );
//     const psHours: number = await PublicServiceActivityController.publicServiceTotalHoursPerUser(
//       userId
//     );
//     const total: number = aaHours + ciHours + emHours + pdHours + psHours;
//     return total;
//   }
//   public static async initializeWorkloads(userId: string) {
//     await this.deleteWorkloads(userId);
//     await AcademicAdministrationWorkloadController.initializeAAWorkload(userId);
//     await CommunityInstructionWorkloadController.initializeCIWorkload(userId);
//     await ExecutiveManagementWorkloadController.initializeEMWorkload(userId);
//     await FormalInstructionWorkloadController.initializeFIWorkload(userId);
//     await PersonnelDevelopmentWorkloadController.initializePDWorkload(userId);
//     await PublicServiceWorkloadController.initializePSWorkload(userId);
//     await ResearchWorkloadController.initializeRWorkload(userId);
//     await WorkloadController.initializeSWorkload(userId);
//     logger.info(`Workloads initialized for User: ${userId}`);
//     return `Workloads initialized for User: ${userId}`;
//   }
//   public static async deleteWorkloads(userId: string) {
//     await AcademicAdministrationWorkloadController.deleteAcademicAdministrationWorkload(
//       userId
//     );
//     await CommunityInstructionWorkloadController.deleteCommunityInstructionWorkload(
//       userId
//     );
//     await ExecutiveManagementWorkloadController.deleteExecutiveManagementWorkload(
//       userId
//     );
//     await FormalInstructionWorkloadController.deleteFormalInstructionWorkload(
//       userId
//     );
//     await PersonnelDevelopmentWorkloadController.deletePersonnelDevelopmentWorkload(
//       userId
//     );
//     await PublicServiceWorkloadController.deletePublicServiceWorkload(userId);
//     await ResearchWorkloadController.deleteResearchWorkload(userId);
//     await WorkloadController.deleteWorkload(userId);
//     logger.info(`Workloads deleted for User: ${userId}`);
//     return `Workloads deleted for User: ${userId}`;
//   }
//   public static async calculateTotalWorkload(userId: string) {
//     // Delete and reinitialize current workloads for user
//     await this.deleteWorkloads(userId);

//     // Calculate and save workloads
//     await AcademicAdministrationWorkloadController.calculateAcademicAdministrationWorkload(
//       userId
//     );
//     await CommunityInstructionWorkloadController.calculateCommunityInstructionWorkload(
//       userId
//     );
//     await ExecutiveManagementWorkloadController.calculateExecutiveManagementWorkload(
//       userId
//     );
//     await FormalInstructionWorkloadController.calculateFormalInstructionWorkload(
//       userId
//     );
//     await PersonnelDevelopmentWorkloadController.calculatePersonnelDevelopmentWorkload(
//       userId
//     );
//     await PublicServiceWorkloadController.calculatePublicServiceWorkload(
//       userId
//     );
//     await ResearchWorkloadController.calculateResearchWorkload(userId);
//     await WorkloadController.calculateWorkload(userId);
//     logger.info(`Workloads updated for User: ${userId}`);

//     // Return totalWorkload only afterwards;
//     // return await this.totalWorkload(userId);
//     return `Workloads updated for User: ${userId}`;
//   }
//   public static async totalWorkload(userId: string) {
//     const aaWorkload: IAcademicAdministrationWorkload = (await AcademicAdministrationWorkloadController.academicAdministrationWorkload(
//       userId
//     )) as IAcademicAdministrationWorkload;
//     const ciWorkload: ICommunityInstructionWorkload = (await CommunityInstructionWorkloadController.communityInstructionWorkload(
//       userId
//     )) as ICommunityInstructionWorkload;
//     const emWorkload: IExecutiveManagementWorkload = (await ExecutiveManagementWorkloadController.executiveManagementWorkload(
//       userId
//     )) as IExecutiveManagementWorkload;
//     const fiWorkload: IFormalInstructionWorkload = (await FormalInstructionWorkloadController.formalInstructionWorkload(
//       userId
//     )) as IFormalInstructionWorkload;
//     const pdWorkload: IPersonnelDevelopmentWorkload = (await PersonnelDevelopmentWorkloadController.personnelDevelopmentWorkload(
//       userId
//     )) as IPersonnelDevelopmentWorkload;
//     const psWorkload: IPublicServiceWorkload = (await PublicServiceWorkloadController.publicServiceWorkload(
//       userId
//     )) as IPublicServiceWorkload;
//     const rWorkload: IResearchWorkload = (await ResearchWorkloadController.researchWorkload(
//       userId
//     )) as IResearchWorkload;
//     const sWorkload: IWorkload = (await WorkloadController.workload(
//       userId
//     )) as IWorkload;

//     return {
//       academicAdministrationWorkload: aaWorkload,
//       communityInstructionWorkload: ciWorkload,
//       executiveManagementWorkload: emWorkload,
//       formalInstructionWorkload: fiWorkload,
//       personnelDevelopmentWorkload: pdWorkload,
//       publicServiceWorkload: psWorkload,
//       researchWorkload: rWorkload,
//       workload: sWorkload
//     };
//   }
//   public static async workloadSummaries() {
//     let workloadSummary = [];
//     const users: IUser[] = (await UserController.users()) as IUser[];
//     for (let user of users) {
//       const tHours = await WorkFocusController.teachingHours(user.userId);
//       const rHours = await WorkFocusController.researchHours(user.userId);
//       const sHours = await WorkFocusController.serviceHours(user.userId);
//       const tHoursPerUser = await this.teachingHoursPerUser(user.userId);
//       const rHoursPerUser = await this.researchHoursPerUser(user.userId);
//       const sHoursPerUser = await this.serviceHoursPerUser(user.userId);
//       const tDifference = tHours - tHoursPerUser;
//       const rDifference = rHours - rHoursPerUser;
//       const sDifference = sHours - sHoursPerUser;

//       workloadSummary.push({
//         user: user,
//         teachingHours: tHours,
//         teachingHoursPerUser: tHoursPerUser,
//         teachingDifference: tDifference,
//         researchHours: rHours,
//         researchHoursPerUser: rHoursPerUser,
//         researchDifference: rDifference,
//         serviceHours: sHours,
//         serviceHoursPerUser: sHoursPerUser,
//         serviceDifference: sDifference
//       });
//     }

//     return workloadSummary;
//   }
// }

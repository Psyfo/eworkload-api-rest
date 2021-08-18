/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import Workload from './workload.model';

class WorkloadController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.find();
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newWorkload = await new Workload(req.body).save();
			const result = await Workload.findOne({ _id: newWorkload._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
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
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
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
	};
	static totalHours = (): void => {};
	static teachingHours = (): void => {};
	static serviceHours = (): void => {};
	static researchHours = (): void => {};
	static initiliazeWorkloads = (): void => {};
	static deleteWorkloads = (): void => {};
	static totalWorkload = (): void => {};
	static workloadSummaries = (): void => {};
	static calculateTotalWorkload = (): void => {};
}

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

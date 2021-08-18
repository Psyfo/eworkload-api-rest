"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../config/logger.config");
const workload_model_1 = __importDefault(require("./workload.model"));
const WorkloadController = {
    async all(req, res, next) {
        try {
            const result = await workload_model_1.default.find();
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async byId(req, res, next) {
        try {
            const result = await workload_model_1.default.findOne({ _id: req.params._id });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async byUserId(req, res, next) {
        try {
            const result = await workload_model_1.default.findOne({ userId: req.params.userId });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async create(req, res, next) {
        try {
            const newWorkload = await new workload_model_1.default(req.body).save();
            const result = await workload_model_1.default.findOne({ _id: newWorkload._id });
            logger_config_1.logger.info('Object created');
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async update(req, res, next) {
        try {
            const result = await workload_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
                $set: req.body
            }, { upsert: true });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            logger_config_1.logger.info('Object updated');
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async delete(req, res, next) {
        try {
            const result = await workload_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            logger_config_1.logger.info('Object deleted');
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async totalHours(req, res, next) { },
    async teachingHours(req, res, next) { },
    async serviceHours(req, res, next) { },
    async researchHours(req, res, next) { },
    async initiliazeWorkloads(req, res, next) { },
    async deleteWorkloads(req, res, next) { },
    async totalWorkload(req, res, next) { },
    async workloadSummaries(req, res, next) { },
    async calculateTotalWorkload(userId) { }
};
exports.default = WorkloadController;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dvcmtsb2FkL3dvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBNEQ7QUFDNUQsK0RBQStEO0FBQy9ELHVEQUF1RDtBQUN2RCx3REFBZ0M7QUFXaEMsOERBQW9EO0FBb0JwRCxzRUFBd0M7QUFFeEMsTUFBTSxrQkFBa0IsR0FBRztJQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDeEQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sd0JBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sd0JBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDNUQ7WUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0YsQ0FBQztJQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUM3RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQzthQUM1RDtZQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDekQ7SUFDRixDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzNELElBQUk7WUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksd0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEQsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNoRSxzQkFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDekQ7SUFDRixDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzNELElBQUk7WUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLHdCQUFRLENBQUMsaUJBQWlCLENBQzlDLEVBQUUsR0FBRyxFQUFFLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQzlDO2dCQUNDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTthQUNkLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2hCLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBQ0Qsc0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0YsQ0FBQztJQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUMzRCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBUSxDQUFDLGlCQUFpQixDQUFDLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQzthQUM1RDtZQUNELHNCQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQ3BFLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixJQUFHLENBQUM7SUFDdkUsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLElBQUcsQ0FBQztJQUN0RSxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQ3ZFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLElBQUcsQ0FBQztJQUM3RSxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQ3pFLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixJQUFHLENBQUM7SUFDdkUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQzNFLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxNQUFjLElBQUcsQ0FBQztDQUMvQyxDQUFDO0FBRUYsa0JBQWUsa0JBQWtCLENBQUM7QUFFbEMsNENBQTRDO0FBQzVDLHlEQUF5RDtBQUN6RCxzSEFBc0g7QUFDdEgsZUFBZTtBQUNmLFNBQVM7QUFDVCxrSEFBa0g7QUFDbEgsZUFBZTtBQUNmLFNBQVM7QUFDVCxnSEFBZ0g7QUFDaEgsZUFBZTtBQUNmLFNBQVM7QUFDVCw0R0FBNEc7QUFDNUcsZUFBZTtBQUNmLFNBQVM7QUFDVCxrSEFBa0g7QUFDbEgsZUFBZTtBQUNmLFNBQVM7QUFDVCxvR0FBb0c7QUFDcEcsZUFBZTtBQUNmLFNBQVM7QUFDVCx5RkFBeUY7QUFDekYsZUFBZTtBQUNmLFNBQVM7QUFDVCwrRkFBK0Y7QUFDL0YsZUFBZTtBQUNmLFNBQVM7QUFDVCw2QkFBNkI7QUFDN0IsWUFBWTtBQUNaLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixtQkFBbUI7QUFDbkIsa0JBQWtCO0FBQ2xCLHdCQUF3QjtBQUN4Qiw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSLG9CQUFvQjtBQUNwQixNQUFNO0FBQ04sK0RBQStEO0FBQy9ELDRHQUE0RztBQUM1RyxlQUFlO0FBQ2YsU0FBUztBQUNULCtGQUErRjtBQUMvRixlQUFlO0FBQ2YsU0FBUztBQUNULDhDQUE4QztBQUM5QyxvQkFBb0I7QUFDcEIsTUFBTTtBQUNOLCtEQUErRDtBQUMvRCx5RkFBeUY7QUFDekYsZUFBZTtBQUNmLFNBQVM7QUFDVCxvQ0FBb0M7QUFDcEMsb0JBQW9CO0FBQ3BCLE1BQU07QUFDTiw4REFBOEQ7QUFDOUQsc0hBQXNIO0FBQ3RILGVBQWU7QUFDZixTQUFTO0FBQ1Qsa0hBQWtIO0FBQ2xILGVBQWU7QUFDZixTQUFTO0FBQ1QsZ0hBQWdIO0FBQ2hILGVBQWU7QUFDZixTQUFTO0FBQ1Qsa0hBQWtIO0FBQ2xILGVBQWU7QUFDZixTQUFTO0FBQ1Qsb0dBQW9HO0FBQ3BHLGVBQWU7QUFDZixTQUFTO0FBQ1QsNkVBQTZFO0FBQzdFLG9CQUFvQjtBQUNwQixNQUFNO0FBQ04sOERBQThEO0FBQzlELDBDQUEwQztBQUMxQyxtRkFBbUY7QUFDbkYsaUZBQWlGO0FBQ2pGLGdGQUFnRjtBQUNoRiw4RUFBOEU7QUFDOUUsaUZBQWlGO0FBQ2pGLDBFQUEwRTtBQUMxRSxvRUFBb0U7QUFDcEUsNERBQTREO0FBQzVELGdFQUFnRTtBQUNoRSwwREFBMEQ7QUFDMUQsTUFBTTtBQUNOLDBEQUEwRDtBQUMxRCwyRkFBMkY7QUFDM0YsZUFBZTtBQUNmLFNBQVM7QUFDVCx1RkFBdUY7QUFDdkYsZUFBZTtBQUNmLFNBQVM7QUFDVCxxRkFBcUY7QUFDckYsZUFBZTtBQUNmLFNBQVM7QUFDVCxpRkFBaUY7QUFDakYsZUFBZTtBQUNmLFNBQVM7QUFDVCx1RkFBdUY7QUFDdkYsZUFBZTtBQUNmLFNBQVM7QUFDVCxpRkFBaUY7QUFDakYsdUVBQXVFO0FBQ3ZFLHVEQUF1RDtBQUN2RCw0REFBNEQ7QUFDNUQsc0RBQXNEO0FBQ3RELE1BQU07QUFDTixpRUFBaUU7QUFDakUsNERBQTREO0FBQzVELDBDQUEwQztBQUUxQyxzQ0FBc0M7QUFDdEMsOEZBQThGO0FBQzlGLGVBQWU7QUFDZixTQUFTO0FBQ1QsMEZBQTBGO0FBQzFGLGVBQWU7QUFDZixTQUFTO0FBQ1Qsd0ZBQXdGO0FBQ3hGLGVBQWU7QUFDZixTQUFTO0FBQ1Qsb0ZBQW9GO0FBQ3BGLGVBQWU7QUFDZixTQUFTO0FBQ1QsMEZBQTBGO0FBQzFGLGVBQWU7QUFDZixTQUFTO0FBQ1QsNEVBQTRFO0FBQzVFLGVBQWU7QUFDZixTQUFTO0FBQ1QsMEVBQTBFO0FBQzFFLDBEQUEwRDtBQUMxRCw0REFBNEQ7QUFFNUQsK0NBQStDO0FBQy9DLGtEQUFrRDtBQUNsRCxzREFBc0Q7QUFDdEQsTUFBTTtBQUNOLHdEQUF3RDtBQUN4RCwwSUFBMEk7QUFDMUksZUFBZTtBQUNmLDZDQUE2QztBQUM3QyxvSUFBb0k7QUFDcEksZUFBZTtBQUNmLDJDQUEyQztBQUMzQyxpSUFBaUk7QUFDakksZUFBZTtBQUNmLDBDQUEwQztBQUMxQywySEFBMkg7QUFDM0gsZUFBZTtBQUNmLHdDQUF3QztBQUN4QyxvSUFBb0k7QUFDcEksZUFBZTtBQUNmLDJDQUEyQztBQUMzQywrR0FBK0c7QUFDL0csZUFBZTtBQUNmLG9DQUFvQztBQUNwQywrRkFBK0Y7QUFDL0YsZUFBZTtBQUNmLCtCQUErQjtBQUMvQix1RUFBdUU7QUFDdkUsZUFBZTtBQUNmLHVCQUF1QjtBQUV2QixlQUFlO0FBQ2Ysb0RBQW9EO0FBQ3BELGtEQUFrRDtBQUNsRCxpREFBaUQ7QUFDakQsK0NBQStDO0FBQy9DLGtEQUFrRDtBQUNsRCwyQ0FBMkM7QUFDM0MscUNBQXFDO0FBQ3JDLDRCQUE0QjtBQUM1QixTQUFTO0FBQ1QsTUFBTTtBQUNOLDhDQUE4QztBQUM5QyxnQ0FBZ0M7QUFDaEMsd0VBQXdFO0FBQ3hFLGdDQUFnQztBQUNoQyw2RUFBNkU7QUFDN0UsNkVBQTZFO0FBQzdFLDRFQUE0RTtBQUM1RSw0RUFBNEU7QUFDNUUsNEVBQTRFO0FBQzVFLDJFQUEyRTtBQUMzRSxvREFBb0Q7QUFDcEQsb0RBQW9EO0FBQ3BELG9EQUFvRDtBQUVwRCwrQkFBK0I7QUFDL0Isc0JBQXNCO0FBQ3RCLGlDQUFpQztBQUNqQywrQ0FBK0M7QUFDL0MsMkNBQTJDO0FBQzNDLGlDQUFpQztBQUNqQywrQ0FBK0M7QUFDL0MsMkNBQTJDO0FBQzNDLGdDQUFnQztBQUNoQyw4Q0FBOEM7QUFDOUMseUNBQXlDO0FBQ3pDLFlBQVk7QUFDWixRQUFRO0FBRVIsOEJBQThCO0FBQzlCLE1BQU07QUFDTixJQUFJIn0=
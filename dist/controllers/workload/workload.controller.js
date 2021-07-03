"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_config_1 = require("./../../config/logger.config");
const academic_administration_activity_controller_1 = __importDefault(require("./../activity/academic-administration-activity.controller"));
const community_instruction_activity_controller_1 = __importDefault(require("./../activity/community-instruction-activity.controller"));
const executive_management_activity_controller_1 = __importDefault(require("./../activity/executive-management-activity.controller"));
const formal_instruction_activity_controller_1 = __importDefault(require("./../activity/formal-instruction-activity.controller"));
const personnel_development_activity_controller_1 = __importDefault(require("./../activity/personnel-development-activity.controller"));
const public_service_activity_controller_1 = __importDefault(require("./../activity/public-service-activity.controller"));
const research_activity_controller_1 = __importDefault(require("./../activity/research-activity.controller"));
const supervision_activity_controller_1 = __importDefault(require("./../activity/supervision-activity.controller"));
const user_controller_1 = __importDefault(require("./../user.controller"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const academic_administration_workload_controller_1 = __importDefault(require("./academic-administration-workload.controller"));
const community_instruction_workload_controller_1 = __importDefault(require("./community-instruction-workload.controller"));
const executive_management_workload_controller_1 = __importDefault(require("./executive-management-workload.controller"));
const formal_instruction_workload_controller_1 = __importDefault(require("./formal-instruction-workload.controller"));
const personnel_development_workload_controller_1 = __importDefault(require("./personnel-development-workload.controller"));
const public_service_workload_controller_1 = __importDefault(require("./public-service-workload.controller"));
const research_workload_controller_1 = __importDefault(require("./research-workload.controller"));
const supervision_workload_controller_1 = __importDefault(require("./supervision-workload.controller"));
class WorkloadController {
    static totalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const aaHours = yield academic_administration_activity_controller_1.default.academicAdministrationTotalHoursPerUser(userId);
            const ciHours = yield community_instruction_activity_controller_1.default.communityInstructionTotalHoursPerUser(userId);
            const emHours = yield executive_management_activity_controller_1.default.executiveManagementTotalHoursPerUser(userId);
            const fiHours = yield formal_instruction_activity_controller_1.default.formalInstructionTotalHoursPerUser(userId);
            const pdHours = yield personnel_development_activity_controller_1.default.personnelDevelopmentTotalHoursPerUser(userId);
            const psHours = yield public_service_activity_controller_1.default.publicServiceTotalHoursPerUser(userId);
            const rHours = yield research_activity_controller_1.default.researchTotalHoursPerUser(userId);
            const sHours = yield supervision_activity_controller_1.default.supervisionTotalHoursPerUser(userId);
            let total = 0;
            try {
                total =
                    aaHours +
                        ciHours +
                        emHours +
                        fiHours +
                        pdHours +
                        psHours +
                        rHours +
                        sHours;
            }
            catch (error) {
                logger_config_1.logger.error(error);
            }
            return total;
        });
    }
    static teachingHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fiHours = yield formal_instruction_activity_controller_1.default.formalInstructionTotalHoursPerUser(userId);
            const sHours = yield supervision_activity_controller_1.default.supervisionTotalHoursPerUser(userId);
            const total = fiHours + sHours;
            return total;
        });
    }
    static researchHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rHours = yield research_activity_controller_1.default.researchTotalHoursPerUser(userId);
            const total = rHours;
            return total;
        });
    }
    static serviceHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const aaHours = yield academic_administration_activity_controller_1.default.academicAdministrationTotalHoursPerUser(userId);
            const ciHours = yield community_instruction_activity_controller_1.default.communityInstructionTotalHoursPerUser(userId);
            const emHours = yield executive_management_activity_controller_1.default.executiveManagementTotalHoursPerUser(userId);
            const pdHours = yield personnel_development_activity_controller_1.default.personnelDevelopmentTotalHoursPerUser(userId);
            const psHours = yield public_service_activity_controller_1.default.publicServiceTotalHoursPerUser(userId);
            const total = aaHours + ciHours + emHours + pdHours + psHours;
            return total;
        });
    }
    static initializeWorkloads(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteWorkloads(userId);
            yield academic_administration_workload_controller_1.default.initializeAAWorkload(userId);
            yield community_instruction_workload_controller_1.default.initializeCIWorkload(userId);
            yield executive_management_workload_controller_1.default.initializeEMWorkload(userId);
            yield formal_instruction_workload_controller_1.default.initializeFIWorkload(userId);
            yield personnel_development_workload_controller_1.default.initializePDWorkload(userId);
            yield public_service_workload_controller_1.default.initializePSWorkload(userId);
            yield research_workload_controller_1.default.initializeRWorkload(userId);
            yield supervision_workload_controller_1.default.initializeSWorkload(userId);
            logger_config_1.logger.info(`Workloads initialized for User: ${userId}`);
            return `Workloads initialized for User: ${userId}`;
        });
    }
    static deleteWorkloads(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield academic_administration_workload_controller_1.default.deleteAcademicAdministrationWorkload(userId);
            yield community_instruction_workload_controller_1.default.deleteCommunityInstructionWorkload(userId);
            yield executive_management_workload_controller_1.default.deleteExecutiveManagementWorkload(userId);
            yield formal_instruction_workload_controller_1.default.deleteFormalInstructionWorkload(userId);
            yield personnel_development_workload_controller_1.default.deletePersonnelDevelopmentWorkload(userId);
            yield public_service_workload_controller_1.default.deletePublicServiceWorkload(userId);
            yield research_workload_controller_1.default.deleteResearchWorkload(userId);
            yield supervision_workload_controller_1.default.deleteSupervisionWorkload(userId);
            logger_config_1.logger.info(`Workloads deleted for User: ${userId}`);
            return `Workloads deleted for User: ${userId}`;
        });
    }
    static calculateTotalWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete and reinitialize current workloads for user
            yield this.deleteWorkloads(userId);
            // Calculate and save workloads
            yield academic_administration_workload_controller_1.default.calculateAcademicAdministrationWorkload(userId);
            yield community_instruction_workload_controller_1.default.calculateCommunityInstructionWorkload(userId);
            yield executive_management_workload_controller_1.default.calculateExecutiveManagementWorkload(userId);
            yield formal_instruction_workload_controller_1.default.calculateFormalInstructionWorkload(userId);
            yield personnel_development_workload_controller_1.default.calculatePersonnelDevelopmentWorkload(userId);
            yield public_service_workload_controller_1.default.calculatePublicServiceWorkload(userId);
            yield research_workload_controller_1.default.calculateResearchWorkload(userId);
            yield supervision_workload_controller_1.default.calculateSupervisionWorkload(userId);
            logger_config_1.logger.info(`Workloads updated for User: ${userId}`);
            // Return totalWorkload only afterwards;
            // return await this.totalWorkload(userId);
            return `Workloads updated for User: ${userId}`;
        });
    }
    static totalWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const aaWorkload = (yield academic_administration_workload_controller_1.default.academicAdministrationWorkload(userId));
            const ciWorkload = (yield community_instruction_workload_controller_1.default.communityInstructionWorkload(userId));
            const emWorkload = (yield executive_management_workload_controller_1.default.executiveManagementWorkload(userId));
            const fiWorkload = (yield formal_instruction_workload_controller_1.default.formalInstructionWorkload(userId));
            const pdWorkload = (yield personnel_development_workload_controller_1.default.personnelDevelopmentWorkload(userId));
            const psWorkload = (yield public_service_workload_controller_1.default.publicServiceWorkload(userId));
            const rWorkload = (yield research_workload_controller_1.default.researchWorkload(userId));
            const sWorkload = (yield supervision_workload_controller_1.default.supervisionWorkload(userId));
            return {
                academicAdministrationWorkload: aaWorkload,
                communityInstructionWorkload: ciWorkload,
                executiveManagementWorkload: emWorkload,
                formalInstructionWorkload: fiWorkload,
                personnelDevelopmentWorkload: pdWorkload,
                publicServiceWorkload: psWorkload,
                researchWorkload: rWorkload,
                supervisionWorkload: sWorkload
            };
        });
    }
    static workloadSummaries() {
        return __awaiter(this, void 0, void 0, function* () {
            let workloadSummary = [];
            const users = (yield user_controller_1.default.users());
            for (let user of users) {
                const tHours = yield work_focus_controller_1.default.teachingHours(user.userId);
                const rHours = yield work_focus_controller_1.default.researchHours(user.userId);
                const sHours = yield work_focus_controller_1.default.serviceHours(user.userId);
                const tHoursPerUser = yield this.teachingHoursPerUser(user.userId);
                const rHoursPerUser = yield this.researchHoursPerUser(user.userId);
                const sHoursPerUser = yield this.serviceHoursPerUser(user.userId);
                const tDifference = tHours - tHoursPerUser;
                const rDifference = rHours - rHoursPerUser;
                const sDifference = sHours - sHoursPerUser;
                workloadSummary.push({
                    user: user,
                    teachingHours: tHours,
                    teachingHoursPerUser: tHoursPerUser,
                    teachingDifference: tDifference,
                    researchHours: rHours,
                    researchHoursPerUser: rHoursPerUser,
                    researchDifference: rDifference,
                    serviceHours: sHours,
                    serviceHoursPerUser: sHoursPerUser,
                    serviceDifference: sDifference
                });
            }
            return workloadSummary;
        });
    }
}
exports.default = WorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL3dvcmtsb2FkL3dvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFVQSxnRUFBc0Q7QUFDdEQsNElBQWlIO0FBQ2pILHdJQUE2RztBQUM3RyxzSUFBMkc7QUFDM0csa0lBQXVHO0FBQ3ZHLHdJQUE2RztBQUM3RywwSEFBK0Y7QUFDL0YsOEdBQW9GO0FBQ3BGLG9IQUEwRjtBQUMxRiwyRUFBa0Q7QUFDbEQsdUZBQTZEO0FBQzdELGdJQUFxRztBQUNyRyw0SEFBaUc7QUFDakcsMEhBQStGO0FBQy9GLHNIQUEyRjtBQUMzRiw0SEFBaUc7QUFDakcsOEdBQW1GO0FBQ25GLGtHQUF3RTtBQUN4RSx3R0FBOEU7QUFFOUUsTUFBcUIsa0JBQWtCO0lBQzlCLE1BQU0sQ0FBTyxpQkFBaUIsQ0FBQyxNQUFXOztZQUMvQyxNQUFNLE9BQU8sR0FBVyxNQUFNLHFEQUF3QyxDQUFDLHVDQUF1QyxDQUM1RyxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sT0FBTyxHQUFXLE1BQU0sbURBQXNDLENBQUMscUNBQXFDLENBQ3hHLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQVcsTUFBTSxrREFBcUMsQ0FBQyxvQ0FBb0MsQ0FDdEcsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLE9BQU8sR0FBVyxNQUFNLGdEQUFtQyxDQUFDLGtDQUFrQyxDQUNsRyxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sT0FBTyxHQUFXLE1BQU0sbURBQXNDLENBQUMscUNBQXFDLENBQ3hHLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQVcsTUFBTSw0Q0FBK0IsQ0FBQyw4QkFBOEIsQ0FDMUYsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLE1BQU0sR0FBVyxNQUFNLHNDQUEwQixDQUFDLHlCQUF5QixD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
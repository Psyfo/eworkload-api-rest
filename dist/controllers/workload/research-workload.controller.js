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
const research_activity_model_1 = __importDefault(require("./../../models/activity/research-activity.model"));
const research_model_1 = __importDefault(require("./../../models/workload/research.model"));
const research_activity_controller_1 = __importDefault(require("./../activity/research-activity.controller"));
class ResearchWorkloadController {
    static initializeRWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rWorkload = new research_model_1.default({
                userId: userId
            });
            return yield rWorkload.save();
        });
    }
    static researchWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_model_1.default.findOne({
                userId: userId
            }).orFail();
        });
    }
    static calculateResearchWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const researchWorkloads = [];
            const activities = (yield research_activity_model_1.default.find({
                userId: userId
            }));
            for (let activity of activities) {
                const researchTotalHoursPerActivity = yield research_activity_controller_1.default.researchTotalHoursPerActivity(activity.activityId);
                const percentageOfWorkFocusPerActivity = yield research_activity_controller_1.default.researchPercentageOfWorkFocusPerActivity(activity.activityId);
                const percentageOfAnnualHoursPerActivity = yield research_activity_controller_1.default.researchPercentageOfAnnualHoursPerActivity(activity.activityId);
                const percentageOfTotalHoursPerActivity = yield research_activity_controller_1.default.researchPercentageOfTotalHoursPerActivity(activity.activityId);
                researchWorkloads.push({
                    activity: activity,
                    totalHoursPerActivity: researchTotalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            const globalTarrif = yield research_activity_controller_1.default.researchGlobalTarrif();
            const totalHoursPerUser = yield research_activity_controller_1.default.researchTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield research_activity_controller_1.default.researchPercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield research_activity_controller_1.default.researchPercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield research_activity_controller_1.default.researchPercentageOfTotalHoursPerUser(userId);
            const researchWorkload = new research_model_1.default({
                userId: userId,
                researchWorkloads: researchWorkloads,
                globalTarrif: globalTarrif,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield researchWorkload.save();
        });
    }
    static deleteResearchWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = ResearchWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZWFyY2gtd29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL3dvcmtsb2FkL3Jlc2VhcmNoLXdvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSw4R0FBK0U7QUFDL0UsNEZBQXNFO0FBQ3RFLDhHQUE0RTtBQUU1RSxNQUFxQiwwQkFBMEI7SUFDdEMsTUFBTSxDQUFPLG1CQUFtQixDQUFDLE1BQWM7O1lBQ3BELE1BQU0sU0FBUyxHQUFzQixJQUFJLHdCQUFnQixDQUFDO2dCQUN4RCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQXNCLENBQUM7WUFDeEIsT0FBTyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sZ0JBQWdCLENBQUMsTUFBYzs7WUFDakQsT0FBTyxNQUFNLHdCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDcEMsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8seUJBQXlCLENBQUMsTUFBYzs7WUFDMUQsTUFBTSxpQkFBaUIsR0FBbUMsRUFBRSxDQUFDO1lBQzdELE1BQU0sVUFBVSxHQUF3QixDQUFDLE1BQU0saUNBQWdCLENBQUMsSUFBSSxDQUFDO2dCQUNuRSxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBd0IsQ0FBQztZQUUzQixLQUFLLElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDL0IsTUFBTSw2QkFBNkIsR0FBVyxNQUFNLHNDQUFrQixDQUFDLDZCQUE2QixDQUNsRyxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLE1BQU0sZ0NBQWdDLEdBQVcsTUFBTSxzQ0FBa0IsQ0FBQyx3Q0FBd0MsQ0FDaEgsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztnQkFDRixNQUFNLGtDQUFrQyxHQUFXLE1BQU0sc0NBQWtCLENBQUMsMENBQTBDLENBQ3BILFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsTUFBTSxpQ0FBaUMsR0FBVyxNQUFNLHNDQUFrQixDQUFDLHlDQUF5QyxDQUNsSCxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLGlCQUFpQixDQUFDLElBQUksQ0FBQztvQkFDckIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLHFCQUFxQixFQUFFLDZCQUE2QjtvQkFDcEQsZ0NBQWdDLEVBQUUsZ0NBQWdDO29CQUNsRSxrQ0FBa0MsRUFBRSxrQ0FBa0M7b0JBQ3RFLGlDQUFpQyxFQUFFLGlDQUFpQztpQkFDckUsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLHNDQUFrQixDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDckUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHNDQUFrQixDQUFDLHlCQUF5QixDQUMxRSxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sNEJBQTRCLEdBQUcsTUFBTSxzQ0FBa0IsQ0FBQyxvQ0FBb0MsQ0FDaEcsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDhCQUE4QixHQUFHLE1BQU0sc0NBQWtCLENBQUMsc0NBQXNDLENBQ3BHLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw2QkFBNkIsR0FBRyxNQUFNLHNDQUFrQixDQUFDLHFDQUFxQyxDQUNsRyxNQUFNLENBQ1AsQ0FBQztZQUVGLE1BQU0sZ0JBQWdCLEdBQXNCLElBQUksd0JBQWdCLENBQUM7Z0JBQy9ELE1BQU0sRUFBRSxNQUFNO2dCQUNkLGlCQUFpQixFQUFFLGlCQUFpQjtnQkFDcEMsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLGlCQUFpQixFQUFFLGlCQUFpQjtnQkFDcEMsNEJBQTRCLEVBQUUsNEJBQTRCO2dCQUMxRCw4QkFBOEIsRUFBRSw4QkFBOEI7Z0JBQzlELDZCQUE2QixFQUFFLDZCQUE2QjthQUM3RCxDQUFzQixDQUFDO1lBRXhCLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sc0JBQXNCLENBQUMsTUFBYzs7WUFDdkQsT0FBTyxNQUFNLHdCQUFnQixDQUFDLGdCQUFnQixDQUFDO2dCQUM3QyxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBdEVELDZDQXNFQyJ9
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
const executive_management_activity_model_1 = __importDefault(require("./../../models/activity/executive-management-activity.model"));
const executive_management_model_1 = __importDefault(require("./../../models/workload/executive-management.model"));
const executive_management_activity_controller_1 = __importDefault(require("./../activity/executive-management-activity.controller"));
class ExecutiveManagementWorkloadController {
    static initializeEMWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const emWorkload = new executive_management_model_1.default({
                userId: userId
            });
            return yield emWorkload.save();
        });
    }
    static executiveManagementWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_model_1.default.findOne({
                userId: userId
            });
        });
    }
    static calculateExecutiveManagementWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const executiveManagementWorkloads = [];
            const activities = (yield executive_management_activity_model_1.default.find({
                userId: userId
            }));
            for (let activity of activities) {
                const executiveManagementTotalHoursPerActivity = yield executive_management_activity_controller_1.default.executiveManagementTotalHoursPerActivity(activity.activityId);
                const percentageOfWorkFocusPerActivity = yield executive_management_activity_controller_1.default.executiveManagementPercentageOfWorkFocusPerActivity(activity.activityId);
                const percentageOfAnnualHoursPerActivity = yield executive_management_activity_controller_1.default.executiveManagementPercentageOfAnnualHoursPerActivity(activity.activityId);
                const percentageOfTotalHoursPerActivity = yield executive_management_activity_controller_1.default.executiveManagementPercentageOfTotalHoursPerActivity(activity.activityId);
                executiveManagementWorkloads.push({
                    activity: activity,
                    totalHoursPerActivity: executiveManagementTotalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            const globalTarrif = yield executive_management_activity_controller_1.default.executiveManagementGlobalTarrif();
            const totalHoursPerUser = yield executive_management_activity_controller_1.default.executiveManagementTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield executive_management_activity_controller_1.default.executiveManagementPercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield executive_management_activity_controller_1.default.executiveManagementPercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield executive_management_activity_controller_1.default.executiveManagementPercentageOfTotalHoursPerUser(userId);
            const executiveManagementWorkload = new executive_management_model_1.default({
                userId: userId,
                executiveManagementWorkloads: executiveManagementWorkloads,
                globalTarrif: globalTarrif,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield executiveManagementWorkload.save();
        });
    }
    static deleteExecutiveManagementWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = ExecutiveManagementWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0aXZlLW1hbmFnZW1lbnQtd29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL3dvcmtsb2FkL2V4ZWN1dGl2ZS1tYW5hZ2VtZW50LXdvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSxzSUFBc0c7QUFDdEcsb0hBQTZGO0FBQzdGLHNJQUFtRztBQUVuRyxNQUFxQixxQ0FBcUM7SUFDakQsTUFBTSxDQUFPLG9CQUFvQixDQUFDLE1BQWM7O1lBQ3JELE1BQU0sVUFBVSxHQUFpQyxJQUFJLG9DQUEyQixDQUFDO2dCQUMvRSxNQUFNLEVBQUUsTUFBTTthQUNmLENBQWlDLENBQUM7WUFDbkMsT0FBTyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sMkJBQTJCLENBQUMsTUFBYzs7WUFDNUQsT0FBTyxNQUFNLG9DQUEyQixDQUFDLE9BQU8sQ0FBQztnQkFDL0MsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sb0NBQW9DLENBQUMsTUFBYzs7WUFDckUsTUFBTSw0QkFBNEIsR0FBOEMsRUFBRSxDQUFDO1lBQ25GLE1BQU0sVUFBVSxHQUFtQyxDQUFDLE1BQU0sNkNBQTJCLENBQUMsSUFBSSxDQUFDO2dCQUN6RixNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBbUMsQ0FBQztZQUV0QyxLQUFLLElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDL0IsTUFBTSx3Q0FBd0MsR0FBVyxNQUFNLGtEQUE2QixDQUFDLHdDQUF3QyxDQUNuSSxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLE1BQU0sZ0NBQWdDLEdBQVcsTUFBTSxrREFBNkIsQ0FBQyxtREFBbUQsQ0FDdEksUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztnQkFDRixNQUFNLGtDQUFrQyxHQUFXLE1BQU0sa0RBQTZCLENBQUMscURBQXFELENBQzFJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsTUFBTSxpQ0FBaUMsR0FBVyxNQUFNLGtEQUE2QixDQUFDLG9EQUFvRCxDQUN4SSxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLDRCQUE0QixDQUFDLElBQUksQ0FBQztvQkFDaEMsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLHFCQUFxQixFQUFFLHdDQUF3QztvQkFDL0QsZ0NBQWdDLEVBQUUsZ0NBQWdDO29CQUNsRSxrQ0FBa0MsRUFBRSxrQ0FBa0M7b0JBQ3RFLGlDQUFpQyxFQUFFLGlDQUFpQztpQkFDckUsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLGtEQUE2QixDQUFDLCtCQUErQixFQUFFLENBQUM7WUFDM0YsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGtEQUE2QixDQUFDLG9DQUFvQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNHLE1BQU0sNEJBQTRCLEdBQUcsTUFBTSxrREFBNkIsQ0FBQywrQ0FBK0MsQ0FDdEgsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDhCQUE4QixHQUFHLE1BQU0sa0RBQTZCLENBQUMsaURBQWlELENBQzFILE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw2QkFBNkIsR0FBRyxNQUFNLGtEQUE2QixDQUFDLGdEQUFnRCxDQUN4SCxNQUFNLENBQ1AsQ0FBQztZQUVGLE1BQU0sMkJBQTJCLEdBQWlDLElBQUksb0NBQTJCLENBQUM7Z0JBQ2hHLE1BQU0sRUFBRSxNQUFNO2dCQUNkLDRCQUE0QixFQUFFLDRCQUE0QjtnQkFDMUQsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLGlCQUFpQixFQUFFLGlCQUFpQjtnQkFDcEMsNEJBQTRCLEVBQUUsNEJBQTRCO2dCQUMxRCw4QkFBOEIsRUFBRSw4QkFBOEI7Z0JBQzlELDZCQUE2QixFQUFFLDZCQUE2QjthQUM3RCxDQUFpQyxDQUFDO1lBRW5DLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsRCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8saUNBQWlDLENBQUMsTUFBYzs7WUFDbEUsT0FBTyxNQUFNLG9DQUEyQixDQUFDLGdCQUFnQixDQUFDO2dCQUN4RCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBcEVELHdEQW9FQyJ9
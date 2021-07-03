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
const public_service_activity_model_1 = __importDefault(require("./../../models/activity/public-service-activity.model"));
const public_service_model_1 = __importDefault(require("./../../models/workload/public-service.model"));
const public_service_activity_controller_1 = __importDefault(require("./../activity/public-service-activity.controller"));
class PublicServiceWorkloadController {
    static initializePSWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const psWorkload = new public_service_model_1.default({
                userId: userId
            });
            return yield psWorkload.save();
        });
    }
    static publicServiceWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_model_1.default.findOne({
                userId: userId
            });
        });
    }
    static calculatePublicServiceWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicServiceWorkloads = [];
            const activities = (yield public_service_activity_model_1.default.find({
                userId: userId
            }));
            for (let activity of activities) {
                const publicServiceTotalHoursPerActivity = yield public_service_activity_controller_1.default.publicServiceTotalHoursPerActivity(activity.activityId);
                const percentageOfWorkFocusPerActivity = yield public_service_activity_controller_1.default.publicServicePercentageOfWorkFocusPerActivity(activity.activityId);
                const percentageOfAnnualHoursPerActivity = yield public_service_activity_controller_1.default.publicServicePercentageOfAnnualHoursPerActivity(activity.activityId);
                const percentageOfTotalHoursPerActivity = yield public_service_activity_controller_1.default.publicServicePercentageOfTotalHoursPerActivity(activity.activityId);
                publicServiceWorkloads.push({
                    activity: activity,
                    totalHoursPerActivity: publicServiceTotalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            const globalTarrif = yield public_service_activity_controller_1.default.publicServiceGlobalTarrif();
            const totalHoursPerUser = yield public_service_activity_controller_1.default.publicServiceTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield public_service_activity_controller_1.default.publicServicePercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield public_service_activity_controller_1.default.publicServicePercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield public_service_activity_controller_1.default.publicServicePercentageOfTotalHoursPerUser(userId);
            const publicServiceWorkload = new public_service_model_1.default({
                userId: userId,
                publicServiceWorkloads: publicServiceWorkloads,
                globalTarrif: globalTarrif,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield publicServiceWorkload.save();
        });
    }
    static deletePublicServiceWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = PublicServiceWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXNlcnZpY2Utd29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL3dvcmtsb2FkL3B1YmxpYy1zZXJ2aWNlLXdvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSwwSEFBMEY7QUFDMUYsd0dBQWlGO0FBQ2pGLDBIQUF1RjtBQUV2RixNQUFxQiwrQkFBK0I7SUFDM0MsTUFBTSxDQUFPLG9CQUFvQixDQUFDLE1BQWM7O1lBQ3JELE1BQU0sVUFBVSxHQUEyQixJQUFJLDhCQUFxQixDQUFDO2dCQUNuRSxNQUFNLEVBQUUsTUFBTTthQUNmLENBQTJCLENBQUM7WUFDN0IsT0FBTyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8scUJBQXFCLENBQUMsTUFBYzs7WUFDdEQsT0FBTyxNQUFNLDhCQUFxQixDQUFDLE9BQU8sQ0FBQztnQkFDekMsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sOEJBQThCLENBQUMsTUFBYzs7WUFDL0QsTUFBTSxzQkFBc0IsR0FBd0MsRUFBRSxDQUFDO1lBQ3ZFLE1BQU0sVUFBVSxHQUE2QixDQUFDLE1BQU0sdUNBQXFCLENBQUMsSUFBSSxDQUFDO2dCQUM3RSxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBNkIsQ0FBQztZQUVoQyxLQUFLLElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDL0IsTUFBTSxrQ0FBa0MsR0FBVyxNQUFNLDRDQUF1QixDQUFDLGtDQUFrQyxDQUNqSCxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLE1BQU0sZ0NBQWdDLEdBQVcsTUFBTSw0Q0FBdUIsQ0FBQyw2Q0FBNkMsQ0FDMUgsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztnQkFDRixNQUFNLGtDQUFrQyxHQUFXLE1BQU0sNENBQXVCLENBQUMsK0NBQStDLENBQzlILFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsTUFBTSxpQ0FBaUMsR0FBVyxNQUFNLDRDQUF1QixDQUFDLDhDQUE4QyxDQUM1SCxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLHNCQUFzQixDQUFDLElBQUksQ0FBQztvQkFDMUIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLHFCQUFxQixFQUFFLGtDQUFrQztvQkFDekQsZ0NBQWdDLEVBQUUsZ0NBQWdDO29CQUNsRSxrQ0FBa0MsRUFBRSxrQ0FBa0M7b0JBQ3RFLGlDQUFpQyxFQUFFLGlDQUFpQztpQkFDckUsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLDRDQUF1QixDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDL0UsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLDRDQUF1QixDQUFDLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9GLE1BQU0sNEJBQTRCLEdBQUcsTUFBTSw0Q0FBdUIsQ0FBQyx5Q0FBeUMsQ0FDMUcsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDhCQUE4QixHQUFHLE1BQU0sNENBQXVCLENBQUMsMkNBQTJDLENBQzlHLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw2QkFBNkIsR0FBRyxNQUFNLDRDQUF1QixDQUFDLDBDQUEwQyxDQUM1RyxNQUFNLENBQ1AsQ0FBQztZQUVGLE1BQU0scUJBQXFCLEdBQTJCLElBQUksOEJBQXFCLENBQUM7Z0JBQzlFLE1BQU0sRUFBRSxNQUFNO2dCQUNkLHNCQUFzQixFQUFFLHNCQUFzQjtnQkFDOUMsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLGlCQUFpQixFQUFFLGlCQUFpQjtnQkFDcEMsNEJBQTRCLEVBQUUsNEJBQTRCO2dCQUMxRCw4QkFBOEIsRUFBRSw4QkFBOEI7Z0JBQzlELDZCQUE2QixFQUFFLDZCQUE2QjthQUM3RCxDQUEyQixDQUFDO1lBRTdCLE9BQU8sTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sMkJBQTJCLENBQUMsTUFBYzs7WUFDNUQsT0FBTyxNQUFNLDhCQUFxQixDQUFDLGdCQUFnQixDQUFDO2dCQUNsRCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBcEVELGtEQW9FQyJ9
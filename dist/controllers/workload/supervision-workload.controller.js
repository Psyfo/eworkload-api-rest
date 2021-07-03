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
const supervision_activity_model_1 = __importDefault(require("./../../models/activity/supervision-activity.model"));
const supervision_model_1 = __importDefault(require("./../../models/workload/supervision.model"));
const supervision_activity_controller_1 = __importDefault(require("./../activity/supervision-activity.controller"));
class SupervisionWorkloadController {
    static initializeSWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sWorkload = new supervision_model_1.default({
                userId: userId
            });
            return yield sWorkload.save();
        });
    }
    static supervisionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_model_1.default.findOne({
                userId: userId
            }).orFail();
        });
    }
    static calculateSupervisionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const supervisionWorkloads = [];
            const activities = (yield supervision_activity_model_1.default.find({
                userId: userId
            }));
            for (let activity of activities) {
                const supervisionTotalHoursPerActivity = yield supervision_activity_controller_1.default.supervisionTotalHoursPerActivity(activity.activityId);
                const percentageOfWorkFocusPerActivity = yield supervision_activity_controller_1.default.supervisionPercentageOfWorkFocusPerActivity(activity.activityId);
                const percentageOfAnnualHoursPerActivity = yield supervision_activity_controller_1.default.supervisionPercentageOfAnnualHoursPerActivity(activity.activityId);
                const percentageOfTotalHoursPerActivity = yield supervision_activity_controller_1.default.supervisionPercentageOfTotalHoursPerActivity(activity.activityId);
                supervisionWorkloads.push({
                    activity: activity,
                    totalHoursPerActivity: supervisionTotalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            const totalHoursPerUser = yield supervision_activity_controller_1.default.supervisionTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield supervision_activity_controller_1.default.supervisionPercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield supervision_activity_controller_1.default.supervisionPercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield supervision_activity_controller_1.default.supervisionPercentageOfTotalHoursPerUser(userId);
            const supervisionWorkload = new supervision_model_1.default({
                userId: userId,
                supervisionWorkloads: supervisionWorkloads,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield supervisionWorkload.save();
        });
    }
    static deleteSupervisionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = SupervisionWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNpb24td29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL3dvcmtsb2FkL3N1cGVydmlzaW9uLXdvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSxvSEFBcUY7QUFDckYsa0dBQTRFO0FBQzVFLG9IQUFrRjtBQUVsRixNQUFxQiw2QkFBNkI7SUFDekMsTUFBTSxDQUFPLG1CQUFtQixDQUFDLE1BQWM7O1lBQ3BELE1BQU0sU0FBUyxHQUF5QixJQUFJLDJCQUFtQixDQUFDO2dCQUM5RCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQXlCLENBQUM7WUFDM0IsT0FBTyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sbUJBQW1CLENBQUMsTUFBYzs7WUFDcEQsT0FBTyxNQUFNLDJCQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDdkMsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sNEJBQTRCLENBQUMsTUFBYzs7WUFDN0QsTUFBTSxvQkFBb0IsR0FBc0MsRUFBRSxDQUFDO1lBQ25FLE1BQU0sVUFBVSxHQUEyQixDQUFDLE1BQU0sb0NBQW1CLENBQUMsSUFBSSxDQUFDO2dCQUN6RSxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBMkIsQ0FBQztZQUU5QixLQUFLLElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDL0IsTUFBTSxnQ0FBZ0MsR0FBVyxNQUFNLHlDQUFxQixDQUFDLGdDQUFnQyxDQUMzRyxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLE1BQU0sZ0NBQWdDLEdBQVcsTUFBTSx5Q0FBcUIsQ0FBQywyQ0FBMkMsQ0FDdEgsUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztnQkFDRixNQUFNLGtDQUFrQyxHQUFXLE1BQU0seUNBQXFCLENBQUMsNkNBQTZDLENBQzFILFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsTUFBTSxpQ0FBaUMsR0FBVyxNQUFNLHlDQUFxQixDQUFDLDRDQUE0QyxDQUN4SCxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLG9CQUFvQixDQUFDLElBQUksQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLHFCQUFxQixFQUFFLGdDQUFnQztvQkFDdkQsZ0NBQWdDLEVBQUUsZ0NBQWdDO29CQUNsRSxrQ0FBa0MsRUFBRSxrQ0FBa0M7b0JBQ3RFLGlDQUFpQyxFQUFFLGlDQUFpQztpQkFDckUsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0seUNBQXFCLENBQUMsNEJBQTRCLENBQ2hGLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw0QkFBNEIsR0FBRyxNQUFNLHlDQUFxQixDQUFDLHVDQUF1QyxDQUN0RyxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sOEJBQThCLEdBQUcsTUFBTSx5Q0FBcUIsQ0FBQyx5Q0FBeUMsQ0FDMUcsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDZCQUE2QixHQUFHLE1BQU0seUNBQXFCLENBQUMsd0NBQXdDLENBQ3hHLE1BQU0sQ0FDUCxDQUFDO1lBRUYsTUFBTSxtQkFBbUIsR0FBeUIsSUFBSSwyQkFBbUIsQ0FBQztnQkFDeEUsTUFBTSxFQUFFLE1BQU07Z0JBQ2Qsb0JBQW9CLEVBQUUsb0JBQW9CO2dCQUMxQyxpQkFBaUIsRUFBRSxpQkFBaUI7Z0JBQ3BDLDRCQUE0QixFQUFFLDRCQUE0QjtnQkFDMUQsOEJBQThCLEVBQUUsOEJBQThCO2dCQUM5RCw2QkFBNkIsRUFBRSw2QkFBNkI7YUFDN0QsQ0FBeUIsQ0FBQztZQUUzQixPQUFPLE1BQU0sbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLHlCQUF5QixDQUFDLE1BQWM7O1lBQzFELE9BQU8sTUFBTSwyQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEQsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQXBFRCxnREFvRUMifQ==
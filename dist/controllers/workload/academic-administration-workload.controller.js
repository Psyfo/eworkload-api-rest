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
const academic_administration_model_1 = __importDefault(require("./../../models/workload/academic-administration.model"));
const academic_administration_activity_controller_1 = __importDefault(require("./../activity/academic-administration-activity.controller"));
class AcademicAdministrationWorkloadController {
    static initializeAAWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const workload = new academic_administration_model_1.default({
                userId: userId
            });
            return yield workload.save();
        });
    }
    static academicAdministrationWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_model_1.default.findOne({
                userId: userId
            });
        });
    }
    static calculateAcademicAdministrationWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let academicAdministrationWorkloads = [];
            let activities = (yield academic_administration_activity_controller_1.default.academicAdministrationActivitiesByUser(userId));
            // Iterate through activities to calculate per-activity workloads
            if (activities) {
                for (let activity of activities) {
                    const academicAdministrationTotalHoursPerActivity = yield academic_administration_activity_controller_1.default.academicAdministrationTotalHoursPerActivity(activity.activityId);
                    const percentageOfWorkFocusPerActivity = yield academic_administration_activity_controller_1.default.academicAdministrationPercentageOfWorkFocusPerActivity(activity.activityId);
                    const percentageOfAnnualHoursPerActivity = yield academic_administration_activity_controller_1.default.academicAdministrationPercentageOfAnnualHoursPerActivity(activity.activityId);
                    const percentageOfTotalHoursPerActivity = yield academic_administration_activity_controller_1.default.academicAdministrationPercentageOfTotalHoursPerActivity(activity.activityId);
                    yield academicAdministrationWorkloads.push({
                        activity: activity,
                        totalHoursPerActivity: academicAdministrationTotalHoursPerActivity,
                        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                    });
                }
            }
            const globalTarrif = yield academic_administration_activity_controller_1.default.academicAdministrationGlobalTarrif();
            const totalHoursPerUser = yield academic_administration_activity_controller_1.default.academicAdministrationTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield academic_administration_activity_controller_1.default.academicAdministrationPercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield academic_administration_activity_controller_1.default.academicAdministrationPercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield academic_administration_activity_controller_1.default.academicAdministrationPercentageOfTotalHoursPerUser(userId);
            const academicAdministrationWorkload = new academic_administration_model_1.default({
                userId: userId,
                academicAdministrationWorkloads: academicAdministrationWorkloads,
                globalTarrif: globalTarrif,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield academicAdministrationWorkload.save();
        });
    }
    static deleteAcademicAdministrationWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = AcademicAdministrationWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24td29ya2xvYWQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL3dvcmtsb2FkL2FjYWRlbWljLWFkbWluaXN0cmF0aW9uLXdvcmtsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSwwSEFBbUc7QUFDbkcsNElBQXlHO0FBRXpHLE1BQXFCLHdDQUF3QztJQUNwRCxNQUFNLENBQU8sb0JBQW9CLENBQUMsTUFBYzs7WUFDckQsTUFBTSxRQUFRLEdBQW9DLElBQUksdUNBQThCLENBQUM7Z0JBQ25GLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBb0MsQ0FBQztZQUN0QyxPQUFPLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyw4QkFBOEIsQ0FBQyxNQUFjOztZQUMvRCxPQUFPLE1BQU0sdUNBQThCLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyx1Q0FBdUMsQ0FBQyxNQUFjOztZQUN4RSxJQUFJLCtCQUErQixHQUFpRCxFQUFFLENBQUM7WUFDdkYsSUFBSSxVQUFVLEdBQXNDLENBQUMsTUFBTSxxREFBZ0MsQ0FBQyxzQ0FBc0MsQ0FDaEksTUFBTSxDQUNQLENBQXNDLENBQUM7WUFFeEMsaUVBQWlFO1lBQ2pFLElBQUksVUFBVSxFQUFFO2dCQUNkLEtBQUssSUFBSSxRQUFRLElBQUksVUFBVSxFQUFFO29CQUMvQixNQUFNLDJDQUEyQyxHQUFXLE1BQU0scURBQWdDLENBQUMsMkNBQTJDLENBQzVJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7b0JBQ0YsTUFBTSxnQ0FBZ0MsR0FBVyxNQUFNLHFEQUFnQyxDQUFDLHNEQUFzRCxDQUM1SSxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO29CQUNGLE1BQU0sa0NBQWtDLEdBQVcsTUFBTSxxREFBZ0MsQ0FBQyx3REFBd0QsQ0FDaEosUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztvQkFDRixNQUFNLGlDQUFpQyxHQUFXLE1BQU0scURBQWdDLENBQUMsdURBQXVELENBQzlJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7b0JBRUYsTUFBTSwrQkFBK0IsQ0FBQyxJQUFJLENBQUM7d0JBQ3pDLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixxQkFBcUIsRUFBRSwyQ0FBMkM7d0JBQ2xFLGdDQUFnQyxFQUFFLGdDQUFnQzt3QkFDbEUsa0NBQWtDLEVBQUUsa0NBQWtDO3dCQUN0RSxpQ0FBaUMsRUFBRSxpQ0FBaUM7cUJBQ3JFLENBQUMsQ0FBQztpQkFDSjthQUNGO1lBQ0QsTUFBTSxZQUFZLEdBQVcsTUFBTSxxREFBZ0MsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1lBQ3pHLE1BQU0saUJBQWlCLEdBQVcsTUFBTSxxREFBZ0MsQ0FBQyx1Q0FBdUMsQ0FDOUcsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDRCQUE0QixHQUFXLE1BQU0scURBQWdDLENBQUMsa0RBQWtELENBQ3BJLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw4QkFBOEIsR0FBVyxNQUFNLHFEQUFnQyxDQUFDLG9EQUFvRCxDQUN4SSxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sNkJBQTZCLEdBQVcsTUFBTSxxREFBZ0MsQ0FBQyxtREFBbUQsQ0FDdEksTUFBTSxDQUNQLENBQUM7WUFFRixNQUFNLDhCQUE4QixHQUFvQyxJQUFJLHVDQUE4QixDQUFDO2dCQUN6RyxNQUFNLEVBQUUsTUFBTTtnQkFDZCwrQkFBK0IsRUFBRSwrQkFBK0I7Z0JBQ2hFLFlBQVksRUFBRSxZQUFZO2dCQUMxQixpQkFBaUIsRUFBRSxpQkFBaUI7Z0JBQ3BDLDRCQUE0QixFQUFFLDRCQUE0QjtnQkFDMUQsOEJBQThCLEVBQUUsOEJBQThCO2dCQUM5RCw2QkFBNkIsRUFBRSw2QkFBNkI7YUFDN0QsQ0FBb0MsQ0FBQztZQUV0QyxPQUFPLE1BQU0sOEJBQThCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLG9DQUFvQyxDQUFDLE1BQWM7O1lBQ3JFLE9BQU8sTUFBTSx1Q0FBOEIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0QsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQTFFRCwyREEwRUMifQ==
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
const personnel_development_activity_model_1 = __importDefault(require("./../../models/activity/personnel-development-activity.model"));
const personnel_development_model_1 = __importDefault(require("./../../models/workload/personnel-development.model"));
const personnel_development_activity_controller_1 = __importDefault(require("./../activity/personnel-development-activity.controller"));
class PersonnelDevelopmentWorkloadController {
    static initializePDWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pdWorkload = new personnel_development_model_1.default({
                userId: userId
            });
            return yield pdWorkload.save();
        });
    }
    static personnelDevelopmentWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_model_1.default.findOne({
                userId: userId
            }).orFail();
        });
    }
    static calculatePersonnelDevelopmentWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const personnelDevelopmentWorkloads = [];
            const activities = (yield personnel_development_activity_model_1.default.find({
                userId: userId
            }));
            for (let activity of activities) {
                const personnelDevelopmentTotalHoursPerActivity = yield personnel_development_activity_controller_1.default.personnelDevelopmentTotalHoursPerActivity(activity.activityId);
                const percentageOfWorkFocusPerActivity = yield personnel_development_activity_controller_1.default.personnelDevelopmentPercentageOfWorkFocusPerActivity(activity.activityId);
                const percentageOfAnnualHoursPerActivity = yield personnel_development_activity_controller_1.default.personnelDevelopmentPercentageOfAnnualHoursPerActivity(activity.activityId);
                const percentageOfTotalHoursPerActivity = yield personnel_development_activity_controller_1.default.personnelDevelopmentPercentageOfTotalHoursPerActivity(activity.activityId);
                personnelDevelopmentWorkloads.push({
                    activity: activity,
                    totalHoursPerActivity: personnelDevelopmentTotalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            const globalTarrif = yield personnel_development_activity_controller_1.default.personnelDevelopmentGlobalTarrif();
            const totalHoursPerUser = yield personnel_development_activity_controller_1.default.personnelDevelopmentTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield personnel_development_activity_controller_1.default.personnelDevelopmentPercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield personnel_development_activity_controller_1.default.personnelDevelopmentPercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield personnel_development_activity_controller_1.default.personnelDevelopmentPercentageOfTotalHoursPerUser(userId);
            const personnelDevelopmentWorkload = new personnel_development_model_1.default({
                userId: userId,
                personnelDevelopmentWorkloads: personnelDevelopmentWorkloads,
                globalTarrif: globalTarrif,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield personnelDevelopmentWorkload.save();
        });
    }
    static deletePersonnelDevelopmentWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = PersonnelDevelopmentWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ubmVsLWRldmVsb3BtZW50LXdvcmtsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb250cm9sbGVycy93b3JrbG9hZC9wZXJzb25uZWwtZGV2ZWxvcG1lbnQtd29ya2xvYWQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUtBLHdJQUF3RztBQUN4RyxzSEFBK0Y7QUFDL0Ysd0lBQXFHO0FBRXJHLE1BQXFCLHNDQUFzQztJQUNsRCxNQUFNLENBQU8sb0JBQW9CLENBQUMsTUFBYzs7WUFDckQsTUFBTSxVQUFVLEdBQWtDLElBQUkscUNBQTRCLENBQ2hGO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FDK0IsQ0FBQztZQUNuQyxPQUFPLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyw0QkFBNEIsQ0FBQyxNQUFjOztZQUM3RCxPQUFPLE1BQU0scUNBQTRCLENBQUMsT0FBTyxDQUFDO2dCQUNoRCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxxQ0FBcUMsQ0FBQyxNQUFjOztZQUN0RSxNQUFNLDZCQUE2QixHQUErQyxFQUFFLENBQUM7WUFDckYsTUFBTSxVQUFVLEdBQW9DLENBQUMsTUFBTSw4Q0FBNEIsQ0FBQyxJQUFJLENBQzFGO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FDRixDQUFvQyxDQUFDO1lBRXRDLEtBQUssSUFBSSxRQUFRLElBQUksVUFBVSxFQUFFO2dCQUMvQixNQUFNLHlDQUF5QyxHQUFXLE1BQU0sbURBQThCLENBQUMseUNBQXlDLENBQ3RJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsTUFBTSxnQ0FBZ0MsR0FBVyxNQUFNLG1EQUE4QixDQUFDLG9EQUFvRCxDQUN4SSxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLE1BQU0sa0NBQWtDLEdBQVcsTUFBTSxtREFBOEIsQ0FBQyxzREFBc0QsQ0FDNUksUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztnQkFDRixNQUFNLGlDQUFpQyxHQUFXLE1BQU0sbURBQThCLENBQUMscURBQXFELENBQzFJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsNkJBQTZCLENBQUMsSUFBSSxDQUFDO29CQUNqQyxRQUFRLEVBQUUsUUFBUTtvQkFDbEIscUJBQXFCLEVBQUUseUNBQXlDO29CQUNoRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0M7b0JBQ2xFLGtDQUFrQyxFQUFFLGtDQUFrQztvQkFDdEUsaUNBQWlDLEVBQUUsaUNBQWlDO2lCQUNyRSxDQUFDLENBQUM7YUFDSjtZQUNELE1BQU0sWUFBWSxHQUFHLE1BQU0sbURBQThCLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztZQUM3RixNQUFNLGlCQUFpQixHQUFHLE1BQU0sbURBQThCLENBQUMscUNBQXFDLENBQ2xHLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw0QkFBNEIsR0FBRyxNQUFNLG1EQUE4QixDQUFDLGdEQUFnRCxDQUN4SCxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sOEJBQThCLEdBQUcsTUFBTSxtREFBOEIsQ0FBQyxrREFBa0QsQ0FDNUgsTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDZCQUE2QixHQUFHLE1BQU0sbURBQThCLENBQUMsaURBQWlELENBQzFILE1BQU0sQ0FDUCxDQUFDO1lBRUYsTUFBTSw0QkFBNEIsR0FBa0MsSUFBSSxxQ0FBNEIsQ0FDbEc7Z0JBQ0UsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsNkJBQTZCLEVBQUUsNkJBQTZCO2dCQUM1RCxZQUFZLEVBQUUsWUFBWTtnQkFDMUIsaUJBQWlCLEVBQUUsaUJBQWlCO2dCQUNwQyw0QkFBNEIsRUFBRSw0QkFBNEI7Z0JBQzFELDhCQUE4QixFQUFFLDhCQUE4QjtnQkFDOUQsNkJBQTZCLEVBQUUsNkJBQTZCO2FBQzdELENBQytCLENBQUM7WUFFbkMsT0FBTyxNQUFNLDRCQUE0QixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxrQ0FBa0MsQ0FBQyxNQUFjOztZQUNuRSxPQUFPLE1BQU0scUNBQTRCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3pELE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUE1RUQseURBNEVDIn0=
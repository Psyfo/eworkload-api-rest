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
const community_instruction_activity_model_1 = __importDefault(require("./../../models/activity/community-instruction-activity.model"));
const community_instruction_model_1 = __importDefault(require("./../../models/workload/community-instruction.model"));
const community_instruction_activity_controller_1 = __importDefault(require("./../activity/community-instruction-activity.controller"));
class CommunityInstructionWorkloadController {
    static initializeCIWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciWorkload = new community_instruction_model_1.default({
                userId: userId
            });
            return yield ciWorkload.save();
        });
    }
    static communityInstructionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_model_1.default.findOne({
                userId: userId
            });
        });
    }
    static calculateCommunityInstructionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let communityInstructionWorkloads = [];
            const activities = (yield community_instruction_activity_model_1.default.find({
                userId: userId
            }));
            for (let activity of activities) {
                let communityInstructionTotalHoursPerActivity = yield community_instruction_activity_controller_1.default.communityInstructionTotalHoursPerActivity(activity.activityId);
                let percentageOfWorkFocusPerActivity = yield community_instruction_activity_controller_1.default.communityInstructionPercentageOfWorkFocusPerActivity(activity.activityId);
                let percentageOfAnnualHoursPerActivity = yield community_instruction_activity_controller_1.default.communityInstructionPercentageOfAnnualHoursPerActivity(activity.activityId);
                let percentageOfTotalHoursPerActivity = yield community_instruction_activity_controller_1.default.communityInstructionPercentageOfTotalHoursPerActivity(activity.activityId);
                communityInstructionWorkloads.push({
                    activity: activity,
                    totalHoursPerActivity: communityInstructionTotalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            const globalTarrif = yield community_instruction_activity_controller_1.default.communityInstructionGlobalTarrif();
            const totalHoursPerUser = yield community_instruction_activity_controller_1.default.communityInstructionTotalHoursPerUser(userId);
            const percentageOfWorkFocusPerUser = yield community_instruction_activity_controller_1.default.communityInstructionPercentageOfWorkFocusPerUser(userId);
            const percentageOfAnnualHoursPerUser = yield community_instruction_activity_controller_1.default.communityInstructionPercentageOfAnnualHoursPerUser(userId);
            const percentageOfTotalHoursPerUser = yield community_instruction_activity_controller_1.default.communityInstructionPercentageOfTotalHoursPerUser(userId);
            const communityInstructionWorkload = new community_instruction_model_1.default({
                userId: userId,
                communityInstructionWorkloads: communityInstructionWorkloads,
                globalTarrif: globalTarrif,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield communityInstructionWorkload.save();
        });
    }
    static deleteCommunityInstructionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_model_1.default.findOneAndRemove({
                userId: userId
            });
        });
    }
}
exports.default = CommunityInstructionWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LWluc3RydWN0aW9uLXdvcmtsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb250cm9sbGVycy93b3JrbG9hZC9jb21tdW5pdHktaW5zdHJ1Y3Rpb24td29ya2xvYWQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUtBLHdJQUF3RztBQUN4RyxzSEFBK0Y7QUFDL0Ysd0lBQXFHO0FBRXJHLE1BQXFCLHNDQUFzQztJQUNsRCxNQUFNLENBQU8sb0JBQW9CLENBQUMsTUFBYzs7WUFDckQsTUFBTSxVQUFVLEdBQWtDLElBQUkscUNBQTRCLENBQUM7Z0JBQ2pGLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBa0MsQ0FBQztZQUNwQyxPQUFPLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyw0QkFBNEIsQ0FBQyxNQUFjOztZQUM3RCxPQUFPLE1BQU0scUNBQTRCLENBQUMsT0FBTyxDQUFDO2dCQUNoRCxNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxxQ0FBcUMsQ0FBQyxNQUFjOztZQUN0RSxJQUFJLDZCQUE2QixHQUErQyxFQUFFLENBQUM7WUFDbkYsTUFBTSxVQUFVLEdBQW9DLENBQUMsTUFBTSw4Q0FBNEIsQ0FBQyxJQUFJLENBQUM7Z0JBQzNGLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFvQyxDQUFDO1lBRXZDLEtBQUssSUFBSSxRQUFRLElBQUksVUFBVSxFQUFFO2dCQUMvQixJQUFJLHlDQUF5QyxHQUFXLE1BQU0sbURBQThCLENBQUMseUNBQXlDLENBQ3BJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsSUFBSSxnQ0FBZ0MsR0FBVyxNQUFNLG1EQUE4QixDQUFDLG9EQUFvRCxDQUN0SSxRQUFRLENBQUMsVUFBVSxDQUNwQixDQUFDO2dCQUNGLElBQUksa0NBQWtDLEdBQVcsTUFBTSxtREFBOEIsQ0FBQyxzREFBc0QsQ0FDMUksUUFBUSxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztnQkFDRixJQUFJLGlDQUFpQyxHQUFXLE1BQU0sbURBQThCLENBQUMscURBQXFELENBQ3hJLFFBQVEsQ0FBQyxVQUFVLENBQ3BCLENBQUM7Z0JBQ0YsNkJBQTZCLENBQUMsSUFBSSxDQUFDO29CQUNqQyxRQUFRLEVBQUUsUUFBUTtvQkFDbEIscUJBQXFCLEVBQUUseUNBQXlDO29CQUNoRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0M7b0JBQ2xFLGtDQUFrQyxFQUFFLGtDQUFrQztvQkFDdEUsaUNBQWlDLEVBQUUsaUNBQWlDO2lCQUNyRSxDQUFDLENBQUM7YUFDSjtZQUNELE1BQU0sWUFBWSxHQUFXLE1BQU0sbURBQThCLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztZQUNyRyxNQUFNLGlCQUFpQixHQUFXLE1BQU0sbURBQThCLENBQUMscUNBQXFDLENBQzFHLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSw0QkFBNEIsR0FBVyxNQUFNLG1EQUE4QixDQUFDLGdEQUFnRCxDQUNoSSxNQUFNLENBQ1AsQ0FBQztZQUNGLE1BQU0sOEJBQThCLEdBQVcsTUFBTSxtREFBOEIsQ0FBQyxrREFBa0QsQ0FDcEksTUFBTSxDQUNQLENBQUM7WUFDRixNQUFNLDZCQUE2QixHQUFXLE1BQU0sbURBQThCLENBQUMsaURBQWlELENBQ2xJLE1BQU0sQ0FDUCxDQUFDO1lBRUYsTUFBTSw0QkFBNEIsR0FBa0MsSUFBSSxxQ0FBNEIsQ0FBQztnQkFDbkcsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsNkJBQTZCLEVBQUUsNkJBQTZCO2dCQUM1RCxZQUFZLEVBQUUsWUFBWTtnQkFDMUIsaUJBQWlCLEVBQUUsaUJBQWlCO2dCQUNwQyw0QkFBNEIsRUFBRSw0QkFBNEI7Z0JBQzFELDhCQUE4QixFQUFFLDhCQUE4QjtnQkFDOUQsNkJBQTZCLEVBQUUsNkJBQTZCO2FBQzdELENBQWtDLENBQUM7WUFFcEMsT0FBTyxNQUFNLDRCQUE0QixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxrQ0FBa0MsQ0FBQyxNQUFjOztZQUNuRSxPQUFPLE1BQU0scUNBQTRCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3pELE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUF0RUQseURBc0VDIn0=
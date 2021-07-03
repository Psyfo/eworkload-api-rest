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
const parameters_config_1 = __importDefault(require("./../../config/parameters.config"));
const community_instruction_activity_model_1 = __importDefault(require("./../../models/activity/community-instruction-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class CommunityInstructionActivityController {
    static communityInstructionActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_activity_model_1.default.findOne({
                activityId: activityId
            })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' }
                ]
            })
                .populate('duty');
        });
    }
    static communityInstructionActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_activity_model_1.default.find({})
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' }
                ]
            })
                .populate('duty');
        });
    }
    static communityInstructionActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_activity_model_1.default.find({ userId: userId })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' }
                ]
            })
                .populate('duty');
        });
    }
    static createCommunityInstructionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new community_instruction_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updateCommunityInstructionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deleteCommunityInstructionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield community_instruction_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static communityInstructionGlobalTarrif() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.global_community_instruction_tarrif;
        });
    }
    static communityInstructionTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.communityInstructionActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            return serviceHours / 10;
        });
    }
    static communityInstructionTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.communityInstructionGlobalTarrif();
            const activities = (yield this.communityInstructionActivitiesByUser(userId));
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.communityInstructionTotalHoursPerActivity(activity.activityId);
            }
            return activityHours + globalTarrif;
        });
    }
    static communityInstructionPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.communityInstructionActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            const activityHours = yield this.communityInstructionTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static communityInstructionPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.communityInstructionGlobalTarrif();
            const serviceHours = yield work_focus_controller_1.default.serviceHours(userId);
            const activityHours = (yield this.communityInstructionTotalHoursPerUser(userId)) + globalTarrif;
            return (activityHours / serviceHours) * 100;
        });
    }
    static communityInstructionPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.communityInstructionTotalHoursPerActivity(activityId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static communityInstructionPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.communityInstructionActivity(activityId));
            const activityHours = yield this.communityInstructionTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours did not come through');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static communityInstructionPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.communityInstructionTotalHoursPerUser(userId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static communityInstructionPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.communityInstructionTotalHoursPerUser(userId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours did not come through');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = CommunityInstructionActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LWluc3RydWN0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb250cm9sbGVycy9hY3Rpdml0eS9jb21tdW5pdHktaW5zdHJ1Y3Rpb24tYWN0aXZpdHkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLHlGQUEwRDtBQUMxRCx3SUFBd0c7QUFDeEcsdUZBQTZEO0FBQzdELDRGQUFtRTtBQUVuRSxNQUFxQixzQ0FBc0M7SUFDbEQsTUFBTSxDQUFPLDRCQUE0QixDQUFDLFVBQWtCOztZQUNqRSxPQUFPLE1BQU0sOENBQTRCLENBQUMsT0FBTyxDQUFDO2dCQUNoRCxVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDO2lCQUNDLFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsTUFBTTtnQkFDYixRQUFRLEVBQUU7b0JBQ1IsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7b0JBQzVDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO29CQUN2QyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtpQkFDMUM7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sOEJBQThCOztZQUNoRCxPQUFPLE1BQU0sOENBQTRCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDL0MsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsVUFB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
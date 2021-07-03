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
const research_activity_model_1 = __importDefault(require("./../../models/activity/research-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class ResearchActivityController {
    static researchActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_activity_model_1.default.findOne({ activityId: activityId })
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
    static researchActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_activity_model_1.default.find({})
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
    static researchActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_activity_model_1.default.find({ userId: userId })
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
    static createResearchActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new research_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updateResearchActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deleteResearchActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield research_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static researchGlobalTarrif() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.global_research_tarrif;
        });
    }
    static researchTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.researchActivity(activityId);
            let totalHours = 60;
            if (activity.output === 'Conference Proceedings') {
                if (activity.conferenceActivities.find((detail) => detail === 'Presented Paper')) {
                    totalHours = 60;
                }
                else if (activity.conferenceActivities.find((detail) => detail === 'Keynote address')) {
                    totalHours = 120;
                }
            }
            else if (activity.output === 'Journal') {
                totalHours === 120;
            }
            else {
                totalHours = 60;
            }
            return totalHours;
        });
    }
    static researchTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.researchGlobalTarrif();
            const activities = (yield this.researchActivitiesByUser(userId));
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.researchTotalHoursPerActivity(activity.activityId);
            }
            return activityHours + globalTarrif;
        });
    }
    static researchPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.researchActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            const activityHours = yield this.researchTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static researchPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceHours = yield work_focus_controller_1.default.serviceHours(userId);
            const activityHours = yield this.researchTotalHoursPerUser(userId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static researchPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.researchTotalHoursPerActivity(activityId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static researchPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.researchTotalHoursPerUser(userId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static researchPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.researchActivity(activityId));
            const activityHours = yield this.researchTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static researchPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.researchTotalHoursPerUser(userId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = ResearchActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZWFyY2gtYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL2FjdGl2aXR5L3Jlc2VhcmNoLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5RkFBMEQ7QUFDMUQsOEdBQStFO0FBQy9FLHVGQUE2RDtBQUM3RCw0RkFBbUU7QUFFbkUsTUFBcUIsMEJBQTBCO0lBQ3RDLE1BQU0sQ0FBTyxnQkFBZ0IsQ0FBQyxVQUFrQjs7WUFDckQsT0FBTyxNQUFNLGlDQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDOUQsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO2lCQUMxQzthQUNGLENBQUM7aUJBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxrQkFBa0I7O1lBQ3BDLE9BQU8sTUFBTSxpQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUNuQyxRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUM1QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtv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
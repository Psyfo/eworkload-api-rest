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
const supervision_activity_model_1 = __importDefault(require("./../../models/activity/supervision-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class SupervisionActivityController {
    static supervisionActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_activity_model_1.default.findOne({ activityId: activityId })
                .populate('user')
                .populate('duty')
                .populate('student');
        });
    }
    static supervisionActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_activity_model_1.default.find({})
                .populate('user')
                .populate('duty')
                .populate('student');
        });
    }
    static supervisionActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_activity_model_1.default.find({ userId: userId })
                .populate('user')
                .populate('duty')
                .populate('student');
        });
    }
    static createSupervisionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new supervision_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updateSupervisionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deleteSupervisionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield supervision_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static supervisionTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.supervisionActivity(activityId));
            let totalHours = 100;
            if (activity.split !== 100) {
                totalHours *= activity.split / 100;
            }
            return totalHours;
        });
    }
    static supervisionTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activities = (yield this.supervisionActivitiesByUser(userId));
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.supervisionTotalHoursPerActivity(activity.activityId);
            }
            return activityHours;
        });
    }
    static supervisionPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activity = (yield this.supervisionActivity(activityId));
            let serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            let activityHours = yield this.supervisionTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static supervisionPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let teachingHours = yield work_focus_controller_1.default.teachingHours(userId);
            let activityHours = yield this.supervisionTotalHoursPerUser(userId);
            return (activityHours / teachingHours) * 100;
        });
    }
    static supervisionPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.supervisionTotalHoursPerActivity(activityId);
            let annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static supervisionPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.supervisionTotalHoursPerUser(userId);
            let annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static supervisionPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activity = (yield this.supervisionActivity(activityId));
            let activityHours = 0;
            activityHours = yield this.supervisionTotalHoursPerActivity(activityId);
            let totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static supervisionPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.supervisionTotalHoursPerUser(userId);
            let totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = SupervisionActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNpb24tYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL2FjdGl2aXR5L3N1cGVydmlzaW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5RkFBMEQ7QUFDMUQsb0hBQXFGO0FBQ3JGLHVGQUE2RDtBQUM3RCw0RkFBbUU7QUFFbkUsTUFBcUIsNkJBQTZCO0lBQ3pDLE1BQU0sQ0FBTyxtQkFBbUIsQ0FBQyxVQUFrQjs7WUFDeEQsT0FBTyxNQUFNLG9DQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDakUsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxxQkFBcUI7O1lBQ3ZDLE9BQU8sTUFBTSxvQ0FBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUN0QyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLDJCQUEyQixDQUFDLE1BQWM7O1lBQzVELE9BQU8sTUFBTSxvQ0FBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQ3RELFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8seUJBQXlCLENBQzNDLFFBQThCOztZQUU5QixNQUFNLFdBQVcsR0FBRyxJQUFJ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
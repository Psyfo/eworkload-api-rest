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
const executive_management_activity_model_1 = __importDefault(require("./../../models/activity/executive-management-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class ExecutiveManagementActivityController {
    static executiveManagementActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_activity_model_1.default.findOne({ activityId: activityId })
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
    static executiveManagementActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_activity_model_1.default.find({})
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
    static executiveManagementActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_activity_model_1.default.find({ userId: userId })
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
    static createExecutiveManagementActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new executive_management_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updateExecutiveManagementActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deleteExecutiveManagementActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield executive_management_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static executiveManagementGlobalTarrif() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.global_executive_management_tarrif;
        });
    }
    static executiveManagementTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.executiveManagementActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            return serviceHours / 10;
        });
    }
    static executiveManagementTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.executiveManagementGlobalTarrif();
            const activities = (yield this.executiveManagementActivitiesByUser(userId));
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.executiveManagementTotalHoursPerActivity(activity.activityId);
            }
            return activityHours + globalTarrif;
        });
    }
    static executiveManagementPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.executiveManagementActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            const activityHours = yield this.executiveManagementTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static executiveManagementPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let globalTarrif = yield this.executiveManagementGlobalTarrif();
            let serviceHours = yield work_focus_controller_1.default.serviceHours(userId);
            let activityHours = (yield this.executiveManagementTotalHoursPerUser(userId)) + globalTarrif;
            return (activityHours / serviceHours) * 100;
        });
    }
    static executiveManagementPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.executiveManagementTotalHoursPerActivity(activityId);
            let annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static executiveManagementPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.executiveManagementActivity(activityId));
            const activityHours = yield this.executiveManagementTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours did not come through');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static executiveManagementPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.executiveManagementTotalHoursPerUser(userId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static executiveManagementPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.executiveManagementTotalHoursPerUser(userId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours did not come through');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = ExecutiveManagementActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0aXZlLW1hbmFnZW1lbnQtYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL2FjdGl2aXR5L2V4ZWN1dGl2ZS1tYW5hZ2VtZW50LWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5RkFBMEQ7QUFDMUQsc0lBQXNHO0FBQ3RHLHVGQUE2RDtBQUM3RCw0RkFBbUU7QUFFbkUsTUFBcUIscUNBQXFDO0lBQ2pELE1BQU0sQ0FBTywyQkFBMkIsQ0FBQyxVQUFrQjs7WUFDaEUsT0FBTyxNQUFNLDZDQUEyQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDekUsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO2lCQUMxQzthQUNGLENBQUM7aUJBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyw2QkFBNkI7O1lBQy9DLE9BQU8sTUFBTSw2Q0FBMkIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUM5QyxRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUM1QyxFQUFFLElBQUksRUFBRSxVQUFVLEVB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
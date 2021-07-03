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
const public_service_activity_model_1 = __importDefault(require("./../../models/activity/public-service-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class PublicServiceActivityController {
    static publicServiceActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_activity_model_1.default.findOne({ activityId: activityId })
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
    static publicServiceActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_activity_model_1.default.find({})
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
    static publicServiceActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_activity_model_1.default.find({ userId: userId })
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
    static createPublicServiceActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new public_service_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updatePublicServiceActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deletePublicServiceActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield public_service_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static publicServiceGlobalTarrif() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.global_public_service_tarrif;
        });
    }
    static publicServiceTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.publicServiceActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            return serviceHours / 10;
        });
    }
    static publicServiceTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.publicServiceGlobalTarrif();
            const activities = (yield this.publicServiceActivitiesByUser(userId));
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.publicServiceTotalHoursPerActivity(activity.activityId);
            }
            return activityHours + globalTarrif;
        });
    }
    static publicServicePercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.publicServiceActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            const activityHours = yield this.publicServiceTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static publicServicePercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceHours = yield work_focus_controller_1.default.serviceHours(userId);
            const activityHours = yield this.publicServiceTotalHoursPerUser(userId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static publicServicePercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.publicServiceTotalHoursPerActivity(activityId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static publicServicePercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.publicServiceTotalHoursPerUser(userId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static publicServicePercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.publicServiceActivity(activityId));
            const activityHours = yield this.publicServiceTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static publicServicePercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.publicServiceTotalHoursPerUser(userId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = PublicServiceActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXNlcnZpY2UtYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL2FjdGl2aXR5L3B1YmxpYy1zZXJ2aWNlLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5RkFBMEQ7QUFDMUQsMEhBQTBGO0FBQzFGLHVGQUE2RDtBQUM3RCw0RkFBbUU7QUFFbkUsTUFBcUIsK0JBQStCO0lBQzNDLE1BQU0sQ0FBTyxxQkFBcUIsQ0FBQyxVQUFrQjs7WUFDMUQsT0FBTyxNQUFNLHVDQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDbkUsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO2lCQUMxQzthQUNGLENBQUM7aUJBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyx1QkFBdUI7O1lBQ3pDLE9BQU8sTUFBTSx1Q0FBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUN4QyxRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUM1QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFF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
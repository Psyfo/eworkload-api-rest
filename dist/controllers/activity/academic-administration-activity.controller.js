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
const academic_administration_activity_model_1 = __importDefault(require("./../../models/activity/academic-administration-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class AcademicAdministrationActivityController {
    static academicAdministrationActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_activity_model_1.default.findOne({
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
                .populate('duty')
                .populate('qualification')
                .orFail();
        });
    }
    static academicAdministrationActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_activity_model_1.default.find({})
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' }
                ]
            })
                .populate('duty')
                .populate('qualification');
        });
    }
    static academicAdministrationActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_activity_model_1.default.find({ userId: userId })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' }
                ]
            })
                .populate('duty')
                .populate('qualification');
        });
    }
    static createAcademicAdministrationActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new academic_administration_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updateAcademicAdministrationActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true }).orFail();
        });
    }
    static deleteAcademicAdministrationActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield academic_administration_activity_model_1.default.findOneAndRemove(activity).orFail();
        });
    }
    static academicAdministrationGlobalTarrif() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.global_academic_administration_tarrif;
        });
    }
    static academicAdministrationBase(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.academicAdministrationActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            const activityHours = serviceHours * 0.25;
            return activityHours;
        });
    }
    static academicAdministrationTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.academicAdministrationActivity(activityId));
            if (!activity) {
                throw new Error('AA Activity is not defined');
            }
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            return serviceHours / 10;
        });
    }
    static academicAdministrationTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let globalTarrif = yield this.academicAdministrationGlobalTarrif();
            const activities = yield this.academicAdministrationActivitiesByUser(userId);
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.academicAdministrationTotalHoursPerActivity(activity.activityId);
            }
            return activityHours + globalTarrif;
        });
    }
    static academicAdministrationPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activity = yield this.academicAdministrationActivity(activityId);
            let serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            let activityHours = yield this.academicAdministrationTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static academicAdministrationPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceHours = yield work_focus_controller_1.default.serviceHours(userId);
            const activityHours = yield this.academicAdministrationTotalHoursPerUser(userId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static academicAdministrationPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.academicAdministrationTotalHoursPerActivity(activityId);
            let annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static academicAdministrationPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.academicAdministrationTotalHoursPerUser(userId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static academicAdministrationPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.academicAdministrationActivity(activityId));
            const activityHours = yield this.academicAdministrationTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours did not come through');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static academicAdministrationPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.academicAdministrationTotalHoursPerUser(userId);
            let totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours did not come through');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = AcademicAdministrationActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24tYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL2FjdGl2aXR5L2FjYWRlbWljLWFkbWluaXN0cmF0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5RkFBMEQ7QUFDMUQsNElBQTRHO0FBQzVHLHVGQUE2RDtBQUM3RCw0RkFBbUU7QUFFbkUsTUFBcUIsd0NBQXdDO0lBQ3BELE1BQU0sQ0FBTyw4QkFBOEIsQ0FBQyxVQUFrQjs7WUFDbkUsT0FBTyxNQUFNLGdEQUE4QixDQUFDLE9BQU8sQ0FBQztnQkFDbEQsVUFBVSxFQUFFLFVBQVU7YUFDdkIsQ0FBQztpQkFDQyxRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUM1QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7aUJBQzFDO2FBQ0YsQ0FBQztpQkFDRCxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixRQUFRLENBQUMsZUFBZSxDQUFDO2lCQUN6QixNQUFNLEVBQUUsQ0FBQztRQUNkLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxnQ0FBZ0M7O1lBQ2xELE9BQU8sTUFBTSxnREFBOEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUNqRCxRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFB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
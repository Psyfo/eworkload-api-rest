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
const personnel_development_activity_model_1 = __importDefault(require("./../../models/activity/personnel-development-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class PersonnelDevelopmentActivityController {
    static personnelDevelopmentActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_activity_model_1.default.findOne({
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
    static personnelDevelopmentActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_activity_model_1.default.find({})
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
    static personnelDevelopmentActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_activity_model_1.default.find({ userId: userId })
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
    static createPersonnelDevelopmentActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new personnel_development_activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updatePersonnelDevelopmentActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deletePersonnelDevelopmentActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield personnel_development_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static personnelDevelopmentGlobalTarrif() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.global_personnel_development_tarrif;
        });
    }
    static personnelDevelopmentTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.personnelDevelopmentActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            return serviceHours / 10;
        });
    }
    static personnelDevelopmentTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.personnelDevelopmentGlobalTarrif();
            const activities = yield this.personnelDevelopmentActivitiesByUser(userId);
            let activityHours = 0;
            for (let activity of activities) {
                activityHours += yield this.personnelDevelopmentTotalHoursPerActivity(activity.activityId);
            }
            return activityHours + globalTarrif;
        });
    }
    static personnelDevelopmentPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.personnelDevelopmentActivity(activityId));
            const serviceHours = yield work_focus_controller_1.default.serviceHours(activity.userId);
            const activityHours = yield this.personnelDevelopmentTotalHoursPerActivity(activityId);
            return (activityHours / serviceHours) * 100;
        });
    }
    static personnelDevelopmentPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTarrif = yield this.personnelDevelopmentGlobalTarrif();
            const serviceHours = yield work_focus_controller_1.default.serviceHours(userId);
            const activityHours = (yield this.personnelDevelopmentTotalHoursPerUser(userId)) + globalTarrif;
            return (activityHours / serviceHours) * 100;
        });
    }
    static personnelDevelopmentPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.personnelDevelopmentTotalHoursPerActivity(activityId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static personnelDevelopmentPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.personnelDevelopmentTotalHoursPerUser(userId);
            const annualHours = parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static personnelDevelopmentPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.personnelDevelopmentActivity(activityId);
            const activityHours = yield this.personnelDevelopmentTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static personnelDevelopmentPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityHours = yield this.personnelDevelopmentTotalHoursPerUser(userId);
            let totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
}
exports.default = PersonnelDevelopmentActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ubmVsLWRldmVsb3BtZW50LWFjdGl2aXR5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb250cm9sbGVycy9hY3Rpdml0eS9wZXJzb25uZWwtZGV2ZWxvcG1lbnQtYWN0aXZpdHkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLHlGQUEwRDtBQUMxRCx3SUFBd0c7QUFDeEcsdUZBQTZEO0FBQzdELDRGQUFtRTtBQUVuRSxNQUFxQixzQ0FBc0M7SUFDbEQsTUFBTSxDQUFPLDRCQUE0QixDQUFDLFVBQWtCOztZQUNqRSxPQUFPLE1BQU0sOENBQTRCLENBQUMsT0FBTyxDQUFDO2dCQUNoRCxVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDO2lCQUNDLFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsTUFBTTtnQkFDYixRQUFRLEVBQUU7b0JBQ1IsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7b0JBQzVDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO29CQUN2QyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtpQkFDMUM7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sOEJBQThCOztZQUNoRCxPQUFPLE1BQU0sOENBQTRCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDL0MsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsVUFB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
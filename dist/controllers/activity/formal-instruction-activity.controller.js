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
const group_controller_1 = __importDefault(require("./../../controllers/group.controller"));
const formal_instruction_activity_model_1 = __importDefault(require("./../../models/activity/formal-instruction-activity.model"));
const work_focus_controller_1 = __importDefault(require("./../work-focus.controller"));
const workload_controller_1 = __importDefault(require("./../workload/workload.controller"));
class FormalInstructionActivityController {
    constructor() {
        this.year = new Date().getFullYear().toString();
    }
    static formalInstructionActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_activity_model_1.default.findOne({ activityId: activityId })
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
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [{ path: 'block' }, { path: 'offeringType' }, { path: 'qualification' }, { path: 'discipline' }]
                }
            });
        });
    }
    static formalInstructionActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_activity_model_1.default.find({})
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
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [
                        { path: 'block' },
                        { path: 'offeringType' },
                        { path: 'qualification' },
                        { path: 'discipline' },
                        { path: 'venue' }
                    ]
                }
            });
        });
    }
    static formalInstructionActivitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_activity_model_1.default.find({ userId: userId })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' },
                    { path: 'department', model: 'Department' }
                ]
            })
                .populate('duty')
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [
                        { path: 'block' },
                        { path: 'offeringType' },
                        { path: 'qualification' },
                        { path: 'discipline' },
                        { path: 'venue' }
                    ]
                }
            });
        });
    }
    static formalInstructionActivitiesByGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_activity_model_1.default.find({ groupId: groupId })
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
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [
                        { path: 'block' },
                        { path: 'offeringType' },
                        { path: 'qualification' },
                        { path: 'discipline' },
                        { path: 'venue' }
                    ]
                }
            });
        });
    }
    static createFormalInstructionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new formal_instruction_activity_model_1.default(activity).save();
        });
    }
    static updateFormalInstructionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deleteFormalInstructionActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_activity_model_1.default.findOneAndRemove(activity);
        });
    }
    static formalInstructionLectureWeeks(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            let lectureWeeks = parameters_config_1.default.lecture_weeks_semester;
            if (activity.group.module.blockId === parameters_config_1.default.annual) {
                lectureWeeks = parameters_config_1.default.lecture_weeks_annual;
            }
            return lectureWeeks;
        });
    }
    static formalInstructionStudentsEnrolled(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = activity.group.studentsEnrolled;
            return students;
        });
    }
    static formalInstructionBaseContactHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return (activity.group.module.credits / 4) * lectureWeeks; // * activity.group.repeat) / activity.group.modularity;
        });
    }
    static formalInstructionCoordinationHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = yield this.formalInstructionStudentsEnrolled(activityId);
            let coordination = 0;
            if (activity.isCoordinator) {
                coordination = 5;
                if (students > 100) {
                    coordination += (students - 100) / 40;
                }
            }
            return coordination;
        });
    }
    static formalInstructionStudentSupportHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = yield this.formalInstructionStudentsEnrolled(activityId);
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return (0.1 * students * activity.group.module.credits) / lectureWeeks / activity.group.modularity;
        });
    }
    static formalInstructionPreparationTimeHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const baseContactHours = yield this.formalInstructionBaseContactHours(activityId);
            return (baseContactHours * (activity.group.module.nqfLevel - 4)) / activity.group.modularity;
        });
    }
    static formalInstructionAssessmentSettingHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return ((((10 * activity.group.module.credits) / lectureWeeks) * (activity.group.module.nqfLevel - 4)) /
                activity.group.modularity);
        });
    }
    static formalInstructionExamMarkingHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = yield this.formalInstructionStudentsEnrolled(activityId);
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return ((0.25 * students * (activity.group.module.credits / lectureWeeks) * (activity.group.module.nqfLevel - 4)) /
                2 /
                activity.group.modularity);
        });
    }
    static formalInstructionCourseworkMarkingHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = yield this.formalInstructionStudentsEnrolled(activityId);
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return (0.5 * students * (activity.group.module.credits / lectureWeeks)) / activity.group.modularity;
        });
    }
    static formalInstructionFeedbackHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = yield this.formalInstructionStudentsEnrolled(activityId);
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return (1 * students * (activity.group.module.credits / lectureWeeks)) / activity.group.modularity;
        });
    }
    static formalInstructionFormativeAssessmentHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const students = yield this.formalInstructionStudentsEnrolled(activityId);
            const lectureWeeks = yield this.formalInstructionLectureWeeks(activityId);
            return (0.4 * students * (activity.group.module.credits / lectureWeeks)) / activity.group.modularity;
        });
    }
    static formalInstructionModerationHours(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const activity: IFormalInstructionActivity = await this.formalInstructionActivity(activityId) as IFormalInstructionActivity;
            // const module:IModule = activity.module as IModule;
            // const students:number = await this.formalInstructionStudentsEnrolled(activityId);
            // const lectureWeeks:number = await this.formalInstructionLectureWeeks(activityId);
            // let moderation = 0;
            // if (activity.userId === module.moderatorId) {
            //   moderation = Math.round((0.1 * students * module.credits) / lectureWeeks) / activity.group.modularity;
            // }
            // return moderation;
        });
    }
    static formalInstructionOtherHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.formalInstructionCoordinationHours(activityId)) +
                (yield this.formalInstructionStudentSupportHours(activityId)) +
                (yield this.formalInstructionPreparationTimeHours(activityId)) +
                (yield this.formalInstructionAssessmentSettingHours(activityId)) +
                (yield this.formalInstructionExamMarkingHours(activityId)) +
                (yield this.formalInstructionCourseworkMarkingHours(activityId)) +
                (yield this.formalInstructionFeedbackHours(activityId)) +
                (yield this.formalInstructionFormativeAssessmentHours(activityId)));
        });
    }
    static formalInstructionTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.formalInstructionBaseContactHours(activityId)) +
                (yield this.formalInstructionOtherHoursPerActivity(activityId)));
        });
    }
    static formalInstructionTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activities = (yield formal_instruction_activity_model_1.default.find({
                userId: userId
            }));
            let activityHours = 0;
            // Cancel if no activities
            if (!activities) {
                return activityHours;
            }
            for (let activity of activities) {
                activityHours += yield this.formalInstructionTotalHoursPerActivity(activity.activityId);
            }
            return activityHours;
        });
    }
    static formalInstructionPercentageOfWorkFocusPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const activityHours = yield this.formalInstructionTotalHoursPerActivity(activityId);
            const workFocusHours = yield work_focus_controller_1.default.teachingHours(activity.userId);
            return (activityHours / workFocusHours) * 100;
        });
    }
    static formalInstructionPercentageOfAnnualHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.formalInstructionTotalHoursPerActivity(activityId);
            const annualHours = yield parameters_config_1.default.annual_total_hours;
            return (activityHours / annualHours) * 100;
        });
    }
    static formalInstructionPercentageOfTotalHoursPerActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = (yield this.formalInstructionActivity(activityId));
            const activityHours = yield this.formalInstructionTotalHoursPerActivity(activityId);
            const totalHours = yield workload_controller_1.default.totalHoursPerUser(activity.userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static formalInstructionPercentageOfWorkFocusPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activities = (yield this.formalInstructionActivitiesByUser(userId));
            let sum = 0;
            for (let activity of activities) {
                sum += yield this.formalInstructionPercentageOfWorkFocusPerActivity(activity.activityId);
            }
            return sum;
        });
    }
    static formalInstructionPercentageOfAnnualHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activities = (yield this.formalInstructionActivitiesByUser(userId));
            let sum = 0;
            for (let activity of activities) {
                sum += yield this.formalInstructionPercentageOfAnnualHoursPerActivity(activity.activityId);
            }
            return sum;
        });
    }
    static formalInstructionPercentageOfTotalHoursPerUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityHours = yield this.formalInstructionTotalHoursPerUser(userId);
            let totalHours = yield workload_controller_1.default.totalHoursPerUser(userId);
            if (totalHours === undefined) {
                throw new Error('Total hours is undefined');
            }
            return (activityHours / totalHours) * 100;
        });
    }
    static isCoordinated(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = (yield group_controller_1.default.groupsByModule(moduleId));
            let coordinator = groups.map((group) => __awaiter(this, void 0, void 0, function* () {
                const activities = (yield this.formalInstructionActivitiesByGroup(group.id));
                return activities.find(activity => { });
            }));
        });
    }
}
exports.default = FormalInstructionActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb250cm9sbGVycy9hY3Rpdml0eS9mb3JtYWwtaW5zdHJ1Y3Rpb24tYWN0aXZpdHkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLHlGQUEwRDtBQUMxRCw0RkFBbUU7QUFFbkUsa0lBQWtHO0FBQ2xHLHVGQUE2RDtBQUM3RCw0RkFBbUU7QUFFbkUsTUFBcUIsbUNBQW1DO0lBQXhEO1FBQ0UsU0FBSSxHQUFXLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFpVXJELENBQUM7SUEvVFEsTUFBTSxDQUFPLHlCQUF5QixDQUFDLFVBQWtCOztZQUM5RCxPQUFPLE1BQU0sMkNBQXlCLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDO2lCQUN2RSxRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUM1QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7aUJBQzFDO2FBQ0YsQ0FBQztpQkFDRCxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixRQUFRLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFF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
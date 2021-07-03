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
const formal_instruction_model_1 = __importDefault(require("../../models/workload/formal-instruction.model"));
const formal_instruction_activity_controller_1 = __importDefault(require("../activity/formal-instruction-activity.controller"));
const block_controller_1 = __importDefault(require("../block.controller"));
const module_controller_1 = __importDefault(require("../module.controller"));
const offering_type_controller_1 = __importDefault(require("../offering-type.controller"));
const qualification_controller_1 = __importDefault(require("../qualification.controller"));
class FormalInstructionWorkloadController {
    static initializeFIWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fiWorkload = new formal_instruction_model_1.default({
                userId: userId
            });
            return yield fiWorkload.save();
        });
    }
    static formalInstructionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_model_1.default.findOne({ userId: userId }).populate({
                path: 'formalInstructionActivity',
                populate: {
                    path: 'module',
                    populate: [{ path: 'block' }, { path: 'block' }, { path: 'offeringType' }, { path: 'qualification' }]
                }
            });
        });
    }
    static calculateFormalInstructionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let formalInstructionWorkloads = [];
            let activities = (yield formal_instruction_activity_controller_1.default.formalInstructionActivitiesByUser(userId));
            for (let activity of activities) {
                let studentsEnrolled = yield formal_instruction_activity_controller_1.default.formalInstructionStudentsEnrolled(activity.activityId);
                let baseContactHours = yield formal_instruction_activity_controller_1.default.formalInstructionBaseContactHours(activity.activityId);
                let coordinationHours = yield formal_instruction_activity_controller_1.default.formalInstructionCoordinationHours(activity.activityId);
                let studentSupportHours = yield formal_instruction_activity_controller_1.default.formalInstructionStudentSupportHours(activity.activityId);
                let preparationTimeHours = yield formal_instruction_activity_controller_1.default.formalInstructionPreparationTimeHours(activity.activityId);
                let assessmentSettingHours = yield formal_instruction_activity_controller_1.default.formalInstructionAssessmentSettingHours(activity.activityId);
                let examMarkingHours = yield formal_instruction_activity_controller_1.default.formalInstructionExamMarkingHours(activity.activityId);
                let courseworkMarkingHours = yield formal_instruction_activity_controller_1.default.formalInstructionCourseworkMarkingHours(activity.activityId);
                let feedbackHours = yield formal_instruction_activity_controller_1.default.formalInstructionFeedbackHours(activity.activityId);
                let formativeAssessmentHours = yield formal_instruction_activity_controller_1.default.formalInstructionFormativeAssessmentHours(activity.activityId);
                let otherHoursPerActivity = yield formal_instruction_activity_controller_1.default.formalInstructionOtherHoursPerActivity(activity.activityId);
                let totalHoursPerActivity = yield formal_instruction_activity_controller_1.default.formalInstructionTotalHoursPerActivity(activity.activityId);
                let percentageOfWorkFocusPerActivity = yield formal_instruction_activity_controller_1.default.formalInstructionPercentageOfWorkFocusPerActivity(activity.activityId);
                let percentageOfAnnualHoursPerActivity = yield formal_instruction_activity_controller_1.default.formalInstructionPercentageOfAnnualHoursPerActivity(activity.activityId);
                let percentageOfTotalHoursPerActivity = yield formal_instruction_activity_controller_1.default.formalInstructionPercentageOfTotalHoursPerActivity(activity.activityId);
                let module = (yield module_controller_1.default.module(activity.group.module.id));
                let block = (yield block_controller_1.default.block(activity.group.module.blockId));
                let offeringType = (yield offering_type_controller_1.default.offeringType(activity.group.module.offeringTypeId));
                let qualification = (yield qualification_controller_1.default.qualification(activity.group.module.qualificationId));
                formalInstructionWorkloads.push({
                    activity: activity,
                    module: module,
                    block: block,
                    offeringType: offeringType,
                    qualification: qualification,
                    studentsEnrolled: studentsEnrolled,
                    baseContactHours: baseContactHours,
                    coordinationHours: coordinationHours,
                    studentSupportHours: studentSupportHours,
                    preparationTimeHours: preparationTimeHours,
                    assessmentSettingHours: assessmentSettingHours,
                    examMarkingHours: examMarkingHours,
                    courseworkMarkingHours: courseworkMarkingHours,
                    feedbackHours: feedbackHours,
                    formativeAssessmentHours: formativeAssessmentHours,
                    otherHoursPerActivity: otherHoursPerActivity,
                    totalHoursPerActivity: totalHoursPerActivity,
                    percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
                    percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
                    percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
                });
            }
            let totalHoursPerUser = 0;
            totalHoursPerUser = yield formal_instruction_activity_controller_1.default.formalInstructionTotalHoursPerUser(userId);
            let percentageOfWorkFocusPerUser = 0;
            percentageOfWorkFocusPerUser = yield formal_instruction_activity_controller_1.default.formalInstructionPercentageOfWorkFocusPerUser(userId);
            let percentageOfAnnualHoursPerUser = 0;
            percentageOfAnnualHoursPerUser = yield formal_instruction_activity_controller_1.default.formalInstructionPercentageOfAnnualHoursPerUser(userId);
            let percentageOfTotalHoursPerUser = 0;
            percentageOfTotalHoursPerUser = yield formal_instruction_activity_controller_1.default.formalInstructionPercentageOfTotalHoursPerUser(userId);
            const formalInstructionWorkload = new formal_instruction_model_1.default({
                userId: userId,
                formalInstructionWorkloads: formalInstructionWorkloads,
                totalHoursPerUser: totalHoursPerUser,
                percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
                percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
                percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
            });
            return yield formalInstructionWorkload.save();
        });
    }
    static deleteFormalInstructionWorkload(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield formal_instruction_model_1.default.findOneAndRemove({ userId: userId });
        });
    }
}
exports.default = FormalInstructionWorkloadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLXdvcmtsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb250cm9sbGVycy93b3JrbG9hZC9mb3JtYWwtaW5zdHJ1Y3Rpb24td29ya2xvYWQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVNBLDhHQUF1RjtBQUN2RixnSUFBNkY7QUFDN0YsMkVBQWtEO0FBQ2xELDZFQUFvRDtBQUNwRCwyRkFBaUU7QUFDakUsMkZBQWtFO0FBRWxFLE1BQXFCLG1DQUFtQztJQUMvQyxNQUFNLENBQU8sb0JBQW9CLENBQUMsTUFBYzs7WUFDckQsTUFBTSxVQUFVLEdBQStCLElBQUksa0NBQXlCLENBQUM7Z0JBQzNFLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBK0IsQ0FBQztZQUNqQyxPQUFPLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyx5QkFBeUIsQ0FBQyxNQUFjOztZQUMxRCxPQUFPLE1BQU0sa0NBQXlCLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUMxRSxJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUM7aUJBQ3RHO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGtDQUFrQyxDQUFDLE1BQWM7O1lBQ25FLElBQUksMEJBQTBCLEdBQTRDLEVBQUUsQ0FBQztZQUU3RSxJQUFJ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
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
const student_model_1 = __importDefault(require("./../models/student.model"));
const supervision_activity_controller_1 = __importDefault(require("./activity/supervision-activity.controller"));
class StudentController {
    static student(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.default.findOne({ studentId: studentId });
        });
    }
    static students() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.default.find({});
        });
    }
    static studentsUnassigned(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // supervision activities
            const activities = yield supervision_activity_controller_1.default.supervisionActivitiesByUser(userId);
            // students already assigned
            const students = activities.map((activity) => {
                return activity.student.studentId;
            });
            return yield student_model_1.default.find({ studentId: { $nin: students } });
        });
    }
    static createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new student_model_1.default(student).save();
        });
    }
    static updateStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.default.findOneAndUpdate({ studentId: student.studentId }, {
                $set: student
            });
        });
    }
    static deleteStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_model_1.default.findOneAndRemove({ studentId: student.studentId });
        });
    }
}
exports.default = StudentController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvc3R1ZGVudC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWdEO0FBQ2hELGlIQUF1RjtBQUd2RixNQUFxQixpQkFBaUI7SUFDN0IsTUFBTSxDQUFPLE9BQU8sQ0FBQyxTQUFpQjs7WUFDM0MsT0FBTyxNQUFNLHVCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFFBQVE7O1lBQzFCLE9BQU8sTUFBTSx1QkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sa0JBQWtCLENBQUMsTUFBYzs7WUFDbkQseUJBQXlCO1lBQ3pCLE1BQU0sVUFBVSxHQUFRLE1BQU0seUNBQTZCLENBQUMsMkJBQTJCLENBQ3JGLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsNEJBQTRCO1lBQzVCLE1BQU0sUUFBUSxHQUFhLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDMUQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sTUFBTSx1QkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGFBQWEsQ0FBQyxPQUFpQjs7WUFDakQsT0FBTyxNQUFNLElBQUksdUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sYUFBYSxDQUFDLE9BQWlCOztZQUNqRCxPQUFPLE1BQU0sdUJBQU8sQ0FBQyxnQkFBZ0IsQ0FDbkMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUNoQztnQkFDRSxJQUFJLEVBQUUsT0FBTzthQUNkLENBQ0YsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxhQUFhLENBQUMsT0FBaUI7O1lBQ2pELE9BQU8sTUFBTSx1QkFBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7S0FBQTtDQUNGO0FBakNELG9DQWlDQyJ9
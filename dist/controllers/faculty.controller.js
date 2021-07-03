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
const faculty_model_1 = __importDefault(require("./../models/faculty.model"));
class FacultyController {
    static faculty(facultyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield faculty_model_1.default.findOne({ facultyId: facultyId });
        });
    }
    static faculties() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield faculty_model_1.default.find({});
        });
    }
    static createFaculty(faculty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new faculty_model_1.default(faculty).save();
        });
    }
    static updateFaculty(faculty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield faculty_model_1.default.findOneAndUpdate({ facultyId: faculty.facultyId }, {
                $set: faculty
            }, { upsert: true });
        });
    }
    static deleteFaculty(faculty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield faculty_model_1.default.findOneAndRemove({ facultyId: faculty.facultyId });
        });
    }
}
exports.default = FacultyController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdWx0eS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvZmFjdWx0eS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWdEO0FBR2hELE1BQXFCLGlCQUFpQjtJQUM3QixNQUFNLENBQU8sT0FBTyxDQUFDLFNBQWlCOztZQUMzQyxPQUFPLE1BQU0sdUJBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sU0FBUzs7WUFDM0IsT0FBTyxNQUFNLHVCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxhQUFhLENBQUMsT0FBaUI7O1lBQ2pELE9BQU8sTUFBTSxJQUFJLHVCQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGFBQWEsQ0FBQyxPQUFpQjs7WUFDakQsT0FBTyxNQUFNLHVCQUFPLENBQUMsZ0JBQWdCLENBQ25DLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFDaEM7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87YUFDZCxFQUNELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNqQixDQUFDO1FBQ0osQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGFBQWEsQ0FBQyxPQUFpQjs7WUFDakQsT0FBTyxNQUFNLHVCQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQztLQUFBO0NBQ0Y7QUF0QkQsb0NBc0JDIn0=
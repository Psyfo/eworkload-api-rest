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
const enrollment_model_1 = __importDefault(require("./../models/enrollment.model"));
const qualification_model_1 = __importDefault(require("./../models/qualification.model"));
class QualificationController {
    static qualification(qualificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield qualification_model_1.default.findOne({
                qualificationId: qualificationId
            }).populate({
                path: 'department',
                model: 'Department',
                populate: {
                    path: 'faculty',
                    model: 'Faculty'
                }
            });
        });
    }
    static qualifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield qualification_model_1.default.find({}).populate({
                path: 'department',
                model: 'Department',
                populate: {
                    path: 'faculty',
                    model: 'Faculty'
                }
            });
        });
    }
    static qualificationsByLevel(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield qualification_model_1.default.find({
                type: { $in: level }
            }).populate({
                path: 'department',
                model: 'Department',
                populate: {
                    path: 'faculty',
                    model: 'Faculty'
                }
            });
        });
    }
    static qualificationsUnenrolled() {
        return __awaiter(this, void 0, void 0, function* () {
            const year = new Date().getFullYear().toString();
            const enrollments = yield enrollment_model_1.default.find({ enrollmentYear: year });
            const qualifications = enrollments.map((enrollment) => {
                return enrollment.qualificationId;
            });
            return qualification_model_1.default.find({ qualificationId: { $nin: qualifications } });
        });
    }
    static createQualification(qualification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new qualification_model_1.default(qualification).save();
        });
    }
    static updateQualification(qualification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield qualification_model_1.default.findOneAndUpdate({ qualificationId: qualification.qualificationId }, {
                $set: qualification
            }, { upsert: true });
        });
    }
    static deleteQualification(qualification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield qualification_model_1.default.findOneAndRemove({ qualificationId: qualification.qualificationId });
        });
    }
}
exports.default = QualificationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbGlmaWNhdGlvbi5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvcXVhbGlmaWNhdGlvbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0ZBQXNEO0FBQ3RELDBGQUE0RDtBQUc1RCxNQUFxQix1QkFBdUI7SUFDbkMsTUFBTSxDQUFPLGFBQWEsQ0FBQyxlQUF1Qjs7WUFDdkQsT0FBTyxNQUFNLDZCQUFhLENBQUMsT0FBTyxDQUFDO2dCQUNqQyxlQUFlLEVBQUUsZUFBZTthQUNqQyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUNWLElBQUksRUFBRSxZQUFZO2dCQUNsQixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxTQUFTO2lCQUNqQjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxjQUFjOztZQUNoQyxPQUFPLE1BQU0sNkJBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsU0FBUztpQkFDakI7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8scUJBQXFCLENBQUMsS0FBZTs7WUFDdkQsT0FBTyxNQUFNLDZCQUFhLENBQUMsSUFBSSxDQUFDO2dCQUM5QixJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO2FBQ3JCLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLEtBQUssRUFBRSxZQUFZO2dCQUNuQixRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLHdCQUF3Qjs7WUFDMUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqRCxNQUFNLFdBQVcsR0FBUSxNQUFNLDBCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekUsTUFBTSxjQUFjLEdBQWEsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQXVCLEVBQUUsRUFBRTtnQkFDM0UsT0FBTyxVQUFVLENBQUMsZUFBZSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyw2QkFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLG1CQUFtQixDQUFDLGFBQTZCOztZQUNuRSxPQUFPLE1BQU0sSUFBSSw2QkFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxtQkFBbUIsQ0FBQyxhQUE2Qjs7WUFDbkUsT0FBTyxNQUFNLDZCQUFhLENBQUMsZ0JBQWdCLENBQ3pDLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsRUFDbEQ7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7YUFDcEIsRUFDRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxtQkFBbUIsQ0FBQyxhQUE2Qjs7WUFDbkUsT0FBTyxNQUFNLDZCQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7UUFDaEcsQ0FBQztLQUFBO0NBQ0Y7QUExREQsMENBMERDIn0=
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
class EnrollmentController {
    static enrollment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrollment_model_1.default.findOne({
                _id: id
            }).populate('qualification');
        });
    }
    static enrollments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrollment_model_1.default.find({}).populate('qualification');
        });
    }
    static enrollmentsByYear(enrollmentYear) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrollment_model_1.default.find({ enrollmentYear: enrollmentYear }).populate('qualification');
        });
    }
    static enrollmentsByQualification(qualificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrollment_model_1.default.find({ qualificationId: qualificationId }).populate('qualification');
        });
    }
    static createEnrollment(enrollment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new enrollment_model_1.default(enrollment).save();
        });
    }
    static updateEnrollment(enrollment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrollment_model_1.default.findOneAndUpdate({
                _id: enrollment.id
            }, {
                $set: enrollment
            }, { upsert: true }).populate('qualification');
        });
    }
    static deleteEnrollment(enrollment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield enrollment_model_1.default.findOneAndRemove({ _id: enrollment.id }).populate('qualification');
        });
    }
}
exports.default = EnrollmentController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvZW5yb2xsbWVudC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0ZBQXNEO0FBRXRELE1BQXFCLG9CQUFvQjtJQUNoQyxNQUFNLENBQU8sVUFBVSxDQUFDLEVBQVU7O1lBQ3ZDLE9BQU8sTUFBTSwwQkFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDOUIsR0FBRyxFQUFFLEVBQUU7YUFDUixDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXOztZQUM3QixPQUFPLE1BQU0sMEJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxpQkFBaUIsQ0FBQyxjQUFzQjs7WUFDMUQsT0FBTyxNQUFNLDBCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUN2RSxlQUFlLENBQ2hCLENBQUM7UUFDSixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sMEJBQTBCLENBQUMsZUFBdUI7O1lBQ3BFLE9BQU8sTUFBTSwwQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FDekUsZUFBZSxDQUNoQixDQUFDO1FBQ0osQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGdCQUFnQixDQUFDLFVBQXVCOztZQUMxRCxPQUFPLE1BQU0sSUFBSSwwQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxnQkFBZ0IsQ0FBQyxVQUF1Qjs7WUFDMUQsT0FBTyxNQUFNLDBCQUFVLENBQUMsZ0JBQWdCLENBQ3RDO2dCQUNFLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRTthQUNuQixFQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2FBQ2pCLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxnQkFBZ0IsQ0FBQyxVQUF1Qjs7WUFDMUQsT0FBTyxNQUFNLDBCQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsUUFBUSxDQUNyRSxlQUFlLENBQ2hCLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQXRDRCx1Q0FzQ0MifQ==
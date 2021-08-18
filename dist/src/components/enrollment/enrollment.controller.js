"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enrollment_model_1 = __importDefault(require("./enrollment.model"));
class EnrollmentControl {
    static async enrollment(id) {
        return await enrollment_model_1.default.findOne({
            _id: id
        }).populate('qualification');
    }
    static async enrollments() {
        return await enrollment_model_1.default.find({}).populate('qualification');
    }
    static async enrollmentsByYear(enrollmentYear) {
        return await enrollment_model_1.default.find({ enrollmentYear: enrollmentYear });
    }
    static async enrollmentsByQualification(qualificationId) {
        return await enrollment_model_1.default.find({ qualificationId: qualificationId });
    }
    static async createEnrollment(enrollment) {
        return await new enrollment_model_1.default(enrollment).save();
    }
    static async updateEnrollment(enrollment) {
        return await enrollment_model_1.default.findOneAndUpdate({
            _id: enrollment.id
        }, {
            $set: enrollment
        }, { upsert: true });
    }
    static async deleteEnrollment(enrollment) {
        return await enrollment_model_1.default.findOneAndRemove({ _id: enrollment.id });
    }
}
const EnrollmentController = {
    async all(req, res, next) { },
    async byId(req, res, next) { },
    async byYear(req, res, next) { },
    async byQualification(req, res, next) { },
    async create(req, res, next) { },
    async update(req, res, next) { },
    async delete(req, res, next) { },
    async exists(req, res, next) { }
};
exports.default = EnrollmentController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZW5yb2xsbWVudC9lbnJvbGxtZW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSwwRUFBNEM7QUFFNUMsTUFBTSxpQkFBaUI7SUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFVO1FBQ3hDLE9BQU8sTUFBTSwwQkFBVSxDQUFDLE9BQU8sQ0FBQztZQUMvQixHQUFHLEVBQUUsRUFBRTtTQUNQLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVztRQUM5QixPQUFPLE1BQU0sMEJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQXNCO1FBQzNELE9BQU8sTUFBTSwwQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLGVBQXVCO1FBQ3JFLE9BQU8sTUFBTSwwQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQXVCO1FBQzNELE9BQU8sTUFBTSxJQUFJLDBCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBdUI7UUFDM0QsT0FBTyxNQUFNLDBCQUFVLENBQUMsZ0JBQWdCLENBQ3ZDO1lBQ0MsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFO1NBQ2xCLEVBQ0Q7WUFDQyxJQUFJLEVBQUUsVUFBVTtTQUNoQixFQUNELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNoQixDQUFDO0lBQ0gsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBdUI7UUFDM0QsT0FBTyxNQUFNLDBCQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNEO0FBRUQsTUFBTSxvQkFBb0IsR0FBRztJQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQzdELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixJQUFHLENBQUM7SUFDOUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLElBQUcsQ0FBQztJQUNoRSxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQ3pFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixJQUFHLENBQUM7SUFDaEUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLElBQUcsQ0FBQztJQUNoRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsSUFBRyxDQUFDO0lBQ2hFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixJQUFHLENBQUM7Q0FDaEUsQ0FBQztBQUVGLGtCQUFlLG9CQUFvQixDQUFDIn0=
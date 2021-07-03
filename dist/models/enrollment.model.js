"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enrollmentSchema = new mongoose_1.default.Schema({
    enrollmentYear: {
        type: String
    },
    qualificationId: {
        type: String
    },
    firstYearEstimated: {
        type: Number
    },
    secondYearEstimated: {
        type: Number
    },
    thirdYearEstimated: {
        type: Number
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
enrollmentSchema.index({ enrollmentYear: 1, qualificationId: 1 }, { unique: true });
enrollmentSchema.virtual('qualification', {
    ref: 'Qualification',
    localField: 'qualificationId',
    foreignField: 'qualificationId',
    justOne: true
});
const Enrollment = mongoose_1.default.model('Enrollment', enrollmentSchema);
exports.default = Enrollment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9lbnJvbGxtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDMUM7SUFDRSxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLGdCQUFnQixDQUFDLEtBQUssQ0FDcEIsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFDekMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7QUFFRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO0lBQ3hDLEdBQUcsRUFBRSxlQUFlO0lBQ3BCLFVBQVUsRUFBRSxpQkFBaUI7SUFDN0IsWUFBWSxFQUFFLGlCQUFpQjtJQUMvQixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2xFLGtCQUFlLFVBQVUsQ0FBQyJ9
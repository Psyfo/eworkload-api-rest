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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Vucm9sbG1lbnQvZW5yb2xsbWVudC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxNQUFNLGdCQUFnQixHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQzFDO0lBQ0UsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxrQkFBa0IsRUFBRTtRQUNsQixJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxNQUFNO0tBQ2I7Q0FDRixFQUNEO0lBQ0UsVUFBVSxFQUFFLElBQUk7SUFDaEIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUNGLENBQUM7QUFFRixnQkFBZ0IsQ0FBQyxLQUFLLENBQ3BCLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQ3pDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNqQixDQUFDO0FBRUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRTtJQUN4QyxHQUFHLEVBQUUsZUFBZTtJQUNwQixVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLFlBQVksRUFBRSxpQkFBaUI7SUFDL0IsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNsRSxrQkFBZSxVQUFVLENBQUMifQ==
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const qualificationSchema = new mongoose_1.default.Schema({
    qualificationId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    nqfLevel: {
        type: String,
        trim: true
    },
    credits: {
        type: Number
    },
    departmentId: {
        type: String,
        trim: true,
        ref: 'Department'
    },
    coordinatorId: {
        type: String,
        trim: true,
        ref: 'User'
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
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
// Virtuals
qualificationSchema.virtual('department', {
    ref: 'Department',
    localField: 'departmentId',
    foreignField: 'departmentId',
    justOne: true
});
qualificationSchema.virtual('coordinator', {
    ref: 'User',
    localField: 'coordinatorId',
    foreignField: 'userId',
    justOne: true
});
const Qualification = mongoose_1.default.model('Qualification', qualificationSchema);
exports.default = Qualification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbGlmaWNhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3F1YWxpZmljYXRpb24vcXVhbGlmaWNhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxNQUFNLG1CQUFtQixHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQzdDO0lBQ0UsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxZQUFZO0tBQ2xCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxNQUFNO0tBQ1o7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFdBQVc7QUFDWCxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO0lBQ3hDLEdBQUcsRUFBRSxZQUFZO0lBQ2pCLFVBQVUsRUFBRSxjQUFjO0lBQzFCLFlBQVksRUFBRSxjQUFjO0lBQzVCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBQ0gsbUJBQW1CLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtJQUN6QyxHQUFHLEVBQUUsTUFBTTtJQUNYLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxhQUFhLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDM0Usa0JBQWUsYUFBYSxDQUFDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    departmentId: {
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
    facultyId: {
        type: String,
        ref: 'Faculty'
    },
    hodId: {
        type: String,
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
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
// Hooks
// Virtuals
departmentSchema.virtual('faculty', {
    ref: 'Faculty',
    localField: 'facultyId',
    foreignField: 'facultyId',
    justOne: true
});
departmentSchema.virtual('hod', {
    ref: 'User',
    localField: 'hodId',
    foreignField: 'userId',
    justOne: true
});
const Department = mongoose_1.default.model('Department', departmentSchema);
exports.default = Department;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RlcGFydG1lbnQvZGVwYXJ0bWVudC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxNQUFNLGdCQUFnQixHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQzNDO0lBQ0MsWUFBWSxFQUFFO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDVjtJQUNELElBQUksRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNWO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsU0FBUztLQUNkO0lBQ0QsS0FBSyxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsTUFBTTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsSUFBSSxFQUFFLElBQUk7S0FDVjtJQUNELFNBQVMsRUFBRTtRQUNWLElBQUksRUFBRSxJQUFJO0tBQ1Y7Q0FDRCxFQUNEO0lBQ0MsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZDtJQUNELE1BQU0sRUFBRTtRQUNQLFFBQVEsRUFBRSxJQUFJO0tBQ2Q7Q0FDRCxDQUNELENBQUM7QUFFRixRQUFRO0FBRVIsV0FBVztBQUNYLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7SUFDbkMsR0FBRyxFQUFFLFNBQVM7SUFDZCxVQUFVLEVBQUUsV0FBVztJQUN2QixZQUFZLEVBQUUsV0FBVztJQUN6QixPQUFPLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQztBQUNILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7SUFDL0IsR0FBRyxFQUFFLE1BQU07SUFDWCxVQUFVLEVBQUUsT0FBTztJQUNuQixZQUFZLEVBQUUsUUFBUTtJQUN0QixPQUFPLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2xFLGtCQUFlLFVBQVUsQ0FBQyJ9
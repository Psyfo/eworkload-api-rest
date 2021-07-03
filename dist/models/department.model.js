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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9kZXBhcnRtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDMUM7SUFDRSxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxTQUFTO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxNQUFNO0tBQ1o7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFFBQVE7QUFFUixXQUFXO0FBQ1gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtJQUNsQyxHQUFHLEVBQUUsU0FBUztJQUNkLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCLFlBQVksRUFBRSxXQUFXO0lBQ3pCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtJQUM5QixHQUFHLEVBQUUsTUFBTTtJQUNYLFVBQVUsRUFBRSxPQUFPO0lBQ25CLFlBQVksRUFBRSxRQUFRO0lBQ3RCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDbEUsa0JBQWUsVUFBVSxDQUFDIn0=
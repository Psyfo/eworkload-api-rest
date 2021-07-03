"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const activitySchema = new mongoose_1.default.Schema({
    activityId: {
        type: String,
        required: true,
        unique: true,
        default: uuid_1.v4
    },
    userId: {
        type: String,
        ref: 'User'
    },
    dutyId: {
        type: String,
        ref: 'Duty'
    },
    approvalStatus: {
        type: String,
        default: 'awaiting'
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true,
    discriminatorKey: 'activityType',
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
// Hooks
// Virtuals
activitySchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true
});
activitySchema.virtual('duty', {
    ref: 'Duty',
    localField: 'dutyId',
    foreignField: 'dutyId',
    justOne: true
});
const Activity = mongoose_1.default.model('Activity', activitySchema);
exports.default = Activity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvYWN0aXZpdHkvYWN0aXZpdHkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsK0JBQWtDO0FBRWxDLE1BQU0sY0FBYyxHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQ3hDO0lBQ0UsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLFNBQU07S0FDaEI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxNQUFNO0tBQ1o7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxNQUFNO0tBQ1o7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO0tBQ1g7Q0FDRixFQUNEO0lBQ0UsVUFBVSxFQUFFLElBQUk7SUFDaEIsZ0JBQWdCLEVBQUUsY0FBYztJQUNoQyxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFFBQVE7QUFFUixXQUFXO0FBQ1gsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7SUFDN0IsR0FBRyxFQUFFLE1BQU07SUFDWCxVQUFVLEVBQUUsUUFBUTtJQUNwQixZQUFZLEVBQUUsUUFBUTtJQUN0QixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUNILGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO0lBQzdCLEdBQUcsRUFBRSxNQUFNO0lBQ1gsVUFBVSxFQUFFLFFBQVE7SUFDcEIsWUFBWSxFQUFFLFFBQVE7SUFDdEIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxNQUFNLFFBQVEsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDNUQsa0JBQWUsUUFBUSxDQUFDIn0=
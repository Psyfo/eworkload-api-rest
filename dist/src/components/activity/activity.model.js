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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUNoQywrQkFBa0M7QUFFbEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDeEM7SUFDRSxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsU0FBTTtLQUNoQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLE1BQU07S0FDWjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLE1BQU07S0FDWjtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFVBQVU7S0FDcEI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixnQkFBZ0IsRUFBRSxjQUFjO0lBQ2hDLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FDRixDQUFDO0FBRUYsUUFBUTtBQUVSLFdBQVc7QUFDWCxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtJQUM3QixHQUFHLEVBQUUsTUFBTTtJQUNYLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBQ0gsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7SUFDN0IsR0FBRyxFQUFFLE1BQU07SUFDWCxVQUFVLEVBQUUsUUFBUTtJQUNwQixZQUFZLEVBQUUsUUFBUTtJQUN0QixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0sUUFBUSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM1RCxrQkFBZSxRQUFRLENBQUMifQ==
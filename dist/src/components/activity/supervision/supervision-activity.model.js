"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_model_1 = __importDefault(require("../activity.model"));
const supervision_activity_controller_1 = __importDefault(require("./supervision-activity.controller"));
const supervisionActivitySchema = new mongoose_1.default.Schema({
    supervisionRole: {
        type: String,
        trim: true
    },
    split: {
        type: Number
    },
    studentId: {
        type: String,
        ref: 'Student'
    },
    year: {
        type: String
    },
    workload: {
        total: { type: Number },
        percentageOfTeaching: { type: Number },
        percentageOfAnnual: { type: Number }
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
// INDEX
// supervisionActivitySchema.index({ studentId: 1, userId: 1, year: 1 }, { unique: true });
// HOOKS
supervisionActivitySchema.post('find', async function (activities) {
    await supervision_activity_controller_1.default.calcWorkload(activities);
});
// supervisionActivitySchema.post('findOneAndUpdate', async function (doc) {
//   const activity: any = doc;
//   await WorkloadController.calculateTotalWorkload(activity.userId);
// });
// supervisionActivitySchema.post('findOneAndRemove', async function (doc) {
//   const activity: any = doc;
//   await WorkloadController.calculateTotalWorkload(activity.userId);
// });
// VIRTUALS
supervisionActivitySchema.virtual('student', {
    ref: 'Student',
    localField: 'studentId',
    foreignField: '_id',
    justOne: true
});
const SupervisionActivity = activity_model_1.default.discriminator('SupervisionActivity', supervisionActivitySchema);
exports.default = SupervisionActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNpb24tYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9zdXBlcnZpc2lvbi9zdXBlcnZpc2lvbi1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUdoQyx1RUFBeUM7QUFDekMsd0dBQThFO0FBRzlFLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDbkQ7SUFDRSxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsU0FBUztLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDdkIsb0JBQW9CLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ3RDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtLQUNyQztDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFFBQVE7QUFDUiwyRkFBMkY7QUFFM0YsUUFBUTtBQUNSLHlCQUF5QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxXQUFXLFVBQVU7SUFDL0QsTUFBTSx5Q0FBNkIsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDLENBQUM7QUFDSCw0RUFBNEU7QUFDNUUsK0JBQStCO0FBQy9CLHNFQUFzRTtBQUN0RSxNQUFNO0FBQ04sNEVBQTRFO0FBQzVFLCtCQUErQjtBQUMvQixzRUFBc0U7QUFDdEUsTUFBTTtBQUVOLFdBQVc7QUFDWCx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO0lBQzNDLEdBQUcsRUFBRSxTQUFTO0lBQ2QsVUFBVSxFQUFFLFdBQVc7SUFDdkIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxNQUFNLG1CQUFtQixHQUFHLHdCQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDckcsa0JBQWUsbUJBQW1CLENBQUMifQ==
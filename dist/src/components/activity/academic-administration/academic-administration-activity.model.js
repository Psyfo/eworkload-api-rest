"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../workload/workload.controller"));
const activity_model_1 = __importDefault(require("../activity.model"));
const academicAdministrationActivitySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    qualificationId: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    evidence: {
        type: String
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
// HOOKS
academicAdministrationActivitySchema.post('save', async function () {
    const activity = await this;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
academicAdministrationActivitySchema.post('findOneAndUpdate', async function (doc) {
    const activity = await doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
academicAdministrationActivitySchema.post('findOneAndRemove', async function (doc) {
    const activity = await doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
// VIRTUALS
academicAdministrationActivitySchema.virtual('qualification', {
    ref: 'Qualification',
    localField: 'qualificationId',
    foreignField: 'qualificationId',
    justOne: true
});
const AcademicAdministrationActivity = activity_model_1.default.discriminator('AcademicAdministrationActivity', academicAdministrationActivitySchema);
exports.default = AcademicAdministrationActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24tYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9hY2FkZW1pYy1hZG1pbmlzdHJhdGlvbi9hY2FkZW1pYy1hZG1pbmlzdHJhdGlvbi1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyw2RkFBb0U7QUFDcEUsdUVBQXlDO0FBRXpDLE1BQU0sb0NBQW9DLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUMvRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtLQUNiO0NBQ0YsRUFBQztJQUNBLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsUUFBUTtBQUNSLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSztJQUNyRCxNQUFNLFFBQVEsR0FBUSxNQUFNLElBQUksQ0FBQztJQUNqQyxNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILG9DQUFvQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLFdBQ2pFLEdBQUc7SUFFSCxNQUFNLFFBQVEsR0FBUSxNQUFNLEdBQUcsQ0FBQztJQUNoQyxNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILG9DQUFvQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLFdBQ2pFLEdBQUc7SUFFSCxNQUFNLFFBQVEsR0FBUSxNQUFNLEdBQUcsQ0FBQztJQUNoQyxNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUVILFdBQVc7QUFDWCxvQ0FBb0MsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO0lBQzVELEdBQUcsRUFBRSxlQUFlO0lBQ3BCLFVBQVUsRUFBRSxpQkFBaUI7SUFDN0IsWUFBWSxFQUFFLGlCQUFpQjtJQUMvQixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0sOEJBQThCLEdBQUcsd0JBQVEsQ0FBQyxhQUFhLENBQzNELGdDQUFnQyxFQUNoQyxvQ0FBb0MsQ0FDckMsQ0FBQztBQUNGLGtCQUFlLDhCQUE4QixDQUFDIn0=
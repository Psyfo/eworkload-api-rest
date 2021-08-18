"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_model_1 = __importDefault(require("../activity.model"));
const formal_instruction_activity_controller_1 = __importDefault(require("./formal-instruction-activity.controller"));
const formalInstructionActivitySchema = new mongoose_1.default.Schema({
    groupId: {
        type: String,
        ref: 'Group'
    },
    workload: {
        baseContact: { type: Number },
        coordination: { type: Number },
        studentSupport: { type: Number },
        preparationTime: { type: Number },
        assessmentSetting: { type: Number },
        examMarking: { type: Number },
        courseworkMarking: { type: Number },
        feedback: { type: Number },
        formativeAssessment: { type: Number },
        other: { type: Number },
        total: { type: Number },
        percentageOfTeaching: { type: Number },
        percentageOfAnnual: { type: Number }
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
// INDEX
// HOOKS
formalInstructionActivitySchema.post('find', async function (activities) {
    await formal_instruction_activity_controller_1.default.calcWorkload(activities);
});
// VIRTUALS
formalInstructionActivitySchema.virtual('group', {
    ref: 'Group',
    localField: 'groupId',
    foreignField: '_id',
    justOne: true
});
const FormalInstructionActivity = activity_model_1.default.discriminator('FormalInstructionActivity', formalInstructionActivitySchema);
exports.default = FormalInstructionActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLWFjdGl2aXR5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWN0aXZpdHkvZm9ybWFsLWluc3RydWN0aW9uL2Zvcm1hbC1pbnN0cnVjdGlvbi1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLHdEQUFnQztBQUdoQyx1RUFBeUM7QUFDekMsc0hBQTJGO0FBSzNGLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDekQ7SUFDRSxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxPQUFPO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQzdCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDOUIsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNoQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ2pDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQzdCLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNuQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQzFCLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNyQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ3ZCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDdkIsb0JBQW9CLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ3RDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtLQUNyQztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0NBQ0YsRUFDRDtJQUNFLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FDRixDQUFDO0FBRUYsUUFBUTtBQUVSLFFBQVE7QUFDUiwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssV0FBVyxVQUFVO0lBQ3JFLE1BQU0sZ0RBQW1DLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBRUgsV0FBVztBQUNYLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7SUFDL0MsR0FBRyxFQUFFLE9BQU87SUFDWixVQUFVLEVBQUUsU0FBUztJQUNyQixZQUFZLEVBQUUsS0FBSztJQUNuQixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0seUJBQXlCLEdBQUcsd0JBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLEVBQUUsK0JBQStCLENBQUMsQ0FBQztBQUN2SCxrQkFBZSx5QkFBeUIsQ0FBQyJ9
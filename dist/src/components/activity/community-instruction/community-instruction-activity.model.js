"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../workload/workload.controller"));
const activity_model_1 = __importDefault(require("../activity.model"));
const communityInstructionActivitySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
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
communityInstructionActivitySchema.post('save', async function () {
    const activity = this;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
communityInstructionActivitySchema.post('findOneAndUpdate', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
communityInstructionActivitySchema.post('findOneAndRemove', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
// VIRTUALS
const CommInstructionActivity = activity_model_1.default.discriminator('CommInstructionActivity', communityInstructionActivitySchema);
exports.default = CommInstructionActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LWluc3RydWN0aW9uLWFjdGl2aXR5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWN0aXZpdHkvY29tbXVuaXR5LWluc3RydWN0aW9uL2NvbW11bml0eS1pbnN0cnVjdGlvbi1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyw2RkFBb0U7QUFDcEUsdUVBQXlDO0FBRXpDLE1BQU0sa0NBQWtDLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUM3RCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLEVBQUM7SUFDQSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUixrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUs7SUFDbkQsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDO0lBQzNCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0gsa0NBQWtDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssV0FDL0QsR0FBRztJQUVILE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztJQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILGtDQUFrQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLFdBQy9ELEdBQUc7SUFFSCxNQUFNLFFBQVEsR0FBUSxHQUFHLENBQUM7SUFDMUIsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFFSCxXQUFXO0FBRVgsTUFBTSx1QkFBdUIsR0FBRyx3QkFBUSxDQUFDLGFBQWEsQ0FDcEQseUJBQXlCLEVBQ3pCLGtDQUFrQyxDQUNuQyxDQUFDO0FBQ0Ysa0JBQWUsdUJBQXVCLENBQUMifQ==
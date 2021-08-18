"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../workload/workload.controller"));
const activity_model_1 = __importDefault(require("../activity.model"));
const personnelDevelopmentActivitySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: [
        {
            type: Date
        }
    ],
    duration: {
        type: String
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
// VIRTUALS
// HOOKS
personnelDevelopmentActivitySchema.post('save', async function () {
    const activity = this;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
personnelDevelopmentActivitySchema.post('findOneAndUpdate', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
personnelDevelopmentActivitySchema.post('findOneAndRemove', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
const PersonnelDevelopmentActivity = activity_model_1.default.discriminator('PersonnelDevelopmentActivity', personnelDevelopmentActivitySchema);
exports.default = PersonnelDevelopmentActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ubmVsLWRldmVsb3BtZW50LWFjdGl2aXR5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWN0aXZpdHkvcGVyc29ubmVsLWRldmVsb3BtZW50L3BlcnNvbm5lbC1kZXZlbG9wbWVudC1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyw2RkFBb0U7QUFDcEUsdUVBQXlDO0FBRXpDLE1BQU0sa0NBQWtDLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUM3RCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKO1lBQ0UsSUFBSSxFQUFFLElBQUk7U0FDWDtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO0tBQ2I7Q0FDRixFQUFDO0lBQ0EsVUFBVSxFQUFFLElBQUk7SUFDaEIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDLENBQUM7QUFFSCxXQUFXO0FBRVgsUUFBUTtBQUNSLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSztJQUNuRCxNQUFNLFFBQVEsR0FBUSxJQUFJLENBQUM7SUFDM0IsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFDSCxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxXQUMvRCxHQUFHO0lBRUgsTUFBTSxRQUFRLEdBQVEsR0FBRyxDQUFDO0lBQzFCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0gsa0NBQWtDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssV0FDL0QsR0FBRztJQUVILE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztJQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sNEJBQTRCLEdBQUcsd0JBQVEsQ0FBQyxhQUFhLENBQ3pELDhCQUE4QixFQUM5QixrQ0FBa0MsQ0FDbkMsQ0FBQztBQUNGLGtCQUFlLDRCQUE0QixDQUFDIn0=
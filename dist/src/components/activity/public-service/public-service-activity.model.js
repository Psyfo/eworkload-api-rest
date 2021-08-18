"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../workload/workload.controller"));
const activity_model_1 = __importDefault(require("../activity.model"));
const publicServiceActivitySchema = new mongoose_1.default.Schema({
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
publicServiceActivitySchema.post('save', async function () {
    const activity = this;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
publicServiceActivitySchema.post('findOneAndUpdate', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
publicServiceActivitySchema.post('findOneAndRemove', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
// VIRTUALS
const PublicServiceActivity = activity_model_1.default.discriminator('PublicServiceActivity', publicServiceActivitySchema);
exports.default = PublicServiceActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXNlcnZpY2UtYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9wdWJsaWMtc2VydmljZS9wdWJsaWMtc2VydmljZS1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyw2RkFBb0U7QUFDcEUsdUVBQXlDO0FBRXpDLE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDckQ7SUFDRSxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFFBQVE7QUFDUiwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUs7SUFDNUMsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDO0lBQzNCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0gsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssV0FBVyxHQUFHO0lBQ3RFLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztJQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILDJCQUEyQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLFdBQVcsR0FBRztJQUN0RSxNQUFNLFFBQVEsR0FBUSxHQUFHLENBQUM7SUFDMUIsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFFSCxXQUFXO0FBRVgsTUFBTSxxQkFBcUIsR0FBRyx3QkFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0FBQzNHLGtCQUFlLHFCQUFxQixDQUFDIn0=
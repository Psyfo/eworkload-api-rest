"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../workload/workload.controller"));
const activity_model_1 = __importDefault(require("../activity.model"));
const executiveManagementActivitySchema = new mongoose_1.default.Schema({
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
});
// HOOKS
executiveManagementActivitySchema.post('save', async function () {
    const activity = this;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
executiveManagementActivitySchema.post('findOneAndUpdate', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
executiveManagementActivitySchema.post('findOneAndRemove', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
// VIRATUALS
const ExecutiveManagementActivity = activity_model_1.default.discriminator('ExecutiveManagementActivity', executiveManagementActivitySchema);
exports.default = ExecutiveManagementActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0aXZlLW1hbmFnZW1lbnQtYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9leGVjdXRpdmUtbWFuYWdlbWVudC9leGVjdXRpdmUtbWFuYWdlbWVudC1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyw2RkFBb0U7QUFDcEUsdUVBQXlDO0FBRXpDLE1BQU0saUNBQWlDLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUM1RCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUixpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUs7SUFDbEQsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDO0lBQzNCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0gsaUNBQWlDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssV0FBVSxHQUFHO0lBQzNFLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztJQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILGlDQUFpQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLFdBQVUsR0FBRztJQUMzRSxNQUFNLFFBQVEsR0FBUSxHQUFHLENBQUM7SUFDMUIsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFFSCxZQUFZO0FBRVosTUFBTSwyQkFBMkIsR0FBRyx3QkFBUSxDQUFDLGFBQWEsQ0FDeEQsNkJBQTZCLEVBQzdCLGlDQUFpQyxDQUNsQyxDQUFDO0FBQ0Ysa0JBQWUsMkJBQTJCLENBQUMifQ==
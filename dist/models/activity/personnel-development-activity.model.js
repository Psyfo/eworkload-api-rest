"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../controllers/workload/workload.controller"));
const activity_model_1 = __importDefault(require("./activity.model"));
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
});
// VIRTUALS
// HOOKS
personnelDevelopmentActivitySchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = this;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
personnelDevelopmentActivitySchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
personnelDevelopmentActivitySchema.post('findOneAndRemove', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
const PersonnelDevelopmentActivity = activity_model_1.default.discriminator('PersonnelDevelopmentActivity', personnelDevelopmentActivitySchema);
exports.default = PersonnelDevelopmentActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ubmVsLWRldmVsb3BtZW50LWFjdGl2aXR5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbW9kZWxzL2FjdGl2aXR5L3BlcnNvbm5lbC1kZXZlbG9wbWVudC1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUVoQyx5R0FBZ0Y7QUFDaEYsc0VBQXdDO0FBRXhDLE1BQU0sa0NBQWtDLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUM3RCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKO1lBQ0UsSUFBSSxFQUFFLElBQUk7U0FDWDtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO0tBQ2I7Q0FDRixDQUFDLENBQUM7QUFFSCxXQUFXO0FBRVgsUUFBUTtBQUNSLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7O1FBQzlDLE1BQU0sUUFBUSxHQUFRLElBQUksQ0FBQztRQUMzQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBQ0gsa0NBQWtDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQzFELEdBQUc7O1FBRUgsTUFBTSxRQUFRLEdBQVEsR0FBRyxDQUFDO1FBQzFCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FBQSxDQUFDLENBQUM7QUFDSCxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFDMUQsR0FBRzs7UUFFSCxNQUFNLFFBQVEsR0FBUSxHQUFHLENBQUM7UUFDMUIsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUVILE1BQU0sNEJBQTRCLEdBQUcsd0JBQVEsQ0FBQyxhQUFhLENBQ3pELDhCQUE4QixFQUM5QixrQ0FBa0MsQ0FDbkMsQ0FBQztBQUNGLGtCQUFlLDRCQUE0QixDQUFDIn0=
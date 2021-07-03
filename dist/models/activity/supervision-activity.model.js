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
const supervisionActivitySchema = new mongoose_1.default.Schema({
    supervisionRole: {
        type: String,
        required: true,
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
    }
});
// INDEX
supervisionActivitySchema.index({ studentId: 1, userId: 1, year: 1 }, { unique: true });
// HOOKS
supervisionActivitySchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = this;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
supervisionActivitySchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
supervisionActivitySchema.post('findOneAndRemove', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
// VIRTUALS
supervisionActivitySchema.virtual('student', {
    ref: 'Student',
    localField: 'studentId',
    foreignField: 'studentId',
    justOne: true
});
const SupervisionActivity = activity_model_1.default.discriminator('SupervisionActivity', supervisionActivitySchema);
exports.default = SupervisionActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNpb24tYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvYWN0aXZpdHkvc3VwZXJ2aXNpb24tYWN0aXZpdHkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMseUdBQWdGO0FBQ2hGLHNFQUF3QztBQUV4QyxNQUFNLHlCQUF5QixHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDcEQsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsU0FBUztLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUix5QkFBeUIsQ0FBQyxLQUFLLENBQzdCLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFDcEMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7QUFFRixRQUFRO0FBQ1IseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTs7UUFDckMsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDO1FBQzNCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FBQSxDQUFDLENBQUM7QUFDSCx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBZSxHQUFHOztRQUNuRSxNQUFNLFFBQVEsR0FBUSxHQUFHLENBQUM7UUFDMUIsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUNILHlCQUF5QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFlLEdBQUc7O1FBQ25FLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztRQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBRUgsV0FBVztBQUNYLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7SUFDM0MsR0FBRyxFQUFFLFNBQVM7SUFDZCxVQUFVLEVBQUUsV0FBVztJQUN2QixZQUFZLEVBQUUsV0FBVztJQUN6QixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0sbUJBQW1CLEdBQUcsd0JBQVEsQ0FBQyxhQUFhLENBQ2hELHFCQUFxQixFQUNyQix5QkFBeUIsQ0FDMUIsQ0FBQztBQUNGLGtCQUFlLG1CQUFtQixDQUFDIn0=
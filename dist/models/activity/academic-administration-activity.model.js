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
});
// HOOKS
academicAdministrationActivitySchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = yield this;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
academicAdministrationActivitySchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = yield doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
academicAdministrationActivitySchema.post('findOneAndRemove', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = yield doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24tYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvYWN0aXZpdHkvYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24tYWN0aXZpdHkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMseUdBQWdGO0FBQ2hGLHNFQUF3QztBQUV4QyxNQUFNLG9DQUFvQyxHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDL0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUixvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOztRQUNoRCxNQUFNLFFBQVEsR0FBUSxNQUFNLElBQUksQ0FBQztRQUNqQyxNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBQ0gsb0NBQW9DLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQzVELEdBQUc7O1FBRUgsTUFBTSxRQUFRLEdBQVEsTUFBTSxHQUFHLENBQUM7UUFDaEMsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUNILG9DQUFvQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUM1RCxHQUFHOztRQUVILE1BQU0sUUFBUSxHQUFRLE1BQU0sR0FBRyxDQUFDO1FBQ2hDLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FBQSxDQUFDLENBQUM7QUFFSCxXQUFXO0FBQ1gsb0NBQW9DLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRTtJQUM1RCxHQUFHLEVBQUUsZUFBZTtJQUNwQixVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLFlBQVksRUFBRSxpQkFBaUI7SUFDL0IsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxNQUFNLDhCQUE4QixHQUFHLHdCQUFRLENBQUMsYUFBYSxDQUMzRCxnQ0FBZ0MsRUFDaEMsb0NBQW9DLENBQ3JDLENBQUM7QUFDRixrQkFBZSw4QkFBOEIsQ0FBQyJ9
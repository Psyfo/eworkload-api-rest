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
});
// HOOKS
publicServiceActivitySchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = this;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
publicServiceActivitySchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
publicServiceActivitySchema.post('findOneAndRemove', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
// VIRTUALS
const PublicServiceActivity = activity_model_1.default.discriminator('PublicServiceActivity', publicServiceActivitySchema);
exports.default = PublicServiceActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXNlcnZpY2UtYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvYWN0aXZpdHkvcHVibGljLXNlcnZpY2UtYWN0aXZpdHkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMseUdBQWdGO0FBQ2hGLHNFQUF3QztBQUV4QyxNQUFNLDJCQUEyQixHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDdEQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO0tBQ2I7Q0FDRixDQUFDLENBQUM7QUFFSCxRQUFRO0FBQ1IsMkJBQTJCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTs7UUFDdkMsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDO1FBQzNCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FBQSxDQUFDLENBQUM7QUFDSCwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBZSxHQUFHOztRQUNyRSxNQUFNLFFBQVEsR0FBUSxHQUFHLENBQUM7UUFDMUIsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUNILDJCQUEyQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFlLEdBQUc7O1FBQ3JFLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztRQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBRUgsV0FBVztBQUVYLE1BQU0scUJBQXFCLEdBQUcsd0JBQVEsQ0FBQyxhQUFhLENBQ2xELHVCQUF1QixFQUN2QiwyQkFBMkIsQ0FDNUIsQ0FBQztBQUNGLGtCQUFlLHFCQUFxQixDQUFDIn0=
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
const researchActivitySchema = new mongoose_1.default.Schema({
    output: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    conferenceActivities: [
        {
            type: String
        }
    ],
    authors: [
        {
            type: String
        }
    ],
    url: {
        type: String,
        trim: true
    },
    dates: [
        {
            type: Date
        }
    ],
    details: {
        type: String,
        trim: true
    },
    evidence: {
        type: String
    }
});
// HOOKS
researchActivitySchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = this;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
researchActivitySchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
researchActivitySchema.post('findOneAndRemove', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
// VIRTUALS
const ResearchActivity = activity_model_1.default.discriminator('ResearchActivity', researchActivitySchema);
exports.default = ResearchActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZWFyY2gtYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvYWN0aXZpdHkvcmVzZWFyY2gtYWN0aXZpdHkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMseUdBQWdGO0FBQ2hGLHNFQUF3QztBQUV4QyxNQUFNLHNCQUFzQixHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDakQsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0Qsb0JBQW9CLEVBQUU7UUFDcEI7WUFDRSxJQUFJLEVBQUUsTUFBTTtTQUNiO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUDtZQUNFLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMO1lBQ0UsSUFBSSxFQUFFLElBQUk7U0FDWDtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOztRQUNsQyxNQUFNLFFBQVEsR0FBUSxJQUFJLENBQUM7UUFDM0IsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUNILHNCQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFlLEdBQUc7O1FBQ2hFLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztRQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBQ0gsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQWUsR0FBRzs7UUFDaEUsTUFBTSxRQUFRLEdBQVEsR0FBRyxDQUFDO1FBQzFCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FBQSxDQUFDLENBQUM7QUFFSCxXQUFXO0FBRVgsTUFBTSxnQkFBZ0IsR0FBRyx3QkFBUSxDQUFDLGFBQWEsQ0FDN0Msa0JBQWtCLEVBQ2xCLHNCQUFzQixDQUN2QixDQUFDO0FBQ0Ysa0JBQWUsZ0JBQWdCLENBQUMifQ==
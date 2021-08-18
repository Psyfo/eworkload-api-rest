"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workload_controller_1 = __importDefault(require("../../workload/workload.controller"));
const activity_model_1 = __importDefault(require("../activity.model"));
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
researchActivitySchema.post('save', async function () {
    const activity = this;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
researchActivitySchema.post('findOneAndUpdate', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
researchActivitySchema.post('findOneAndRemove', async function (doc) {
    const activity = doc;
    await workload_controller_1.default.calculateTotalWorkload(activity.userId);
});
// VIRTUALS
const ResearchActivity = activity_model_1.default.discriminator('ResearchActivity', researchActivitySchema);
exports.default = ResearchActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZWFyY2gtYWN0aXZpdHkubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9yZXNlYXJjaC9yZXNlYXJjaC1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyw2RkFBb0U7QUFDcEUsdUVBQXlDO0FBRXpDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDaEQ7SUFDRSxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxvQkFBb0IsRUFBRTtRQUNwQjtZQUNFLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQO1lBQ0UsSUFBSSxFQUFFLE1BQU07U0FDYjtLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0w7WUFDRSxJQUFJLEVBQUUsSUFBSTtTQUNYO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtLQUNiO0NBQ0YsRUFDRDtJQUNFLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FDRixDQUFDO0FBRUYsUUFBUTtBQUNSLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSztJQUN2QyxNQUFNLFFBQVEsR0FBUSxJQUFJLENBQUM7SUFDM0IsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFDSCxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxXQUFXLEdBQUc7SUFDakUsTUFBTSxRQUFRLEdBQVEsR0FBRyxDQUFDO0lBQzFCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0gsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssV0FBVyxHQUFHO0lBQ2pFLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztJQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUVILFdBQVc7QUFFWCxNQUFNLGdCQUFnQixHQUFHLHdCQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDNUYsa0JBQWUsZ0JBQWdCLENBQUMifQ==
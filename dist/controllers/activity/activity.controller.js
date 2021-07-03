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
const activity_model_1 = __importDefault(require("./../../models/activity/activity.model"));
class ActivityController {
    static activity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.default.findOne({ activityId: activityId });
        });
    }
    static activities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.default.find({});
        });
    }
    static activitiesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.default.find({ userId: userId });
        });
    }
    static createActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new activity_model_1.default(activity);
            return yield newActivity.save();
        });
    }
    static updateActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.default.findOneAndUpdate({ activityId: activity.activityId }, {
                $set: activity
            }, { upsert: true });
        });
    }
    static deleteActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.default.findOneAndRemove(activity);
        });
    }
}
exports.default = ActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXJzL2FjdGl2aXR5L2FjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSw0RkFBOEQ7QUFFOUQsTUFBcUIsa0JBQWtCO0lBQzlCLE1BQU0sQ0FBTyxRQUFRLENBQUMsVUFBa0I7O1lBQzdDLE9BQU8sTUFBTSx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVOztZQUM1QixPQUFPLE1BQU0sd0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGdCQUFnQixDQUFDLE1BQWM7O1lBQ2pELE9BQU8sTUFBTSx3QkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxjQUFjLENBQUMsUUFBbUI7O1lBQ3BELE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxPQUFPLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxjQUFjLENBQUMsUUFBbUI7O1lBQ3BELE9BQU8sTUFBTSx3QkFBUSxDQUFDLGdCQUFnQixDQUNwQyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQ25DO2dCQUNFLElBQUksRUFBRSxRQUFRO2FBQ2YsRUFDRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxjQUFjLENBQUMsUUFBYTs7WUFDOUMsT0FBTyxNQUFNLHdCQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0NBQ0Y7QUExQkQscUNBMEJDIn0=
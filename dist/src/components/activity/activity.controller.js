"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_model_1 = __importDefault(require("./activity.model"));
class ActivityController {
    static async byId(_id) {
        return await activity_model_1.default.findOne({ _id: _id });
    }
    static async all() {
        return await activity_model_1.default.find({});
    }
    static async byUserId(userId) {
        return await activity_model_1.default.find({ userId: userId });
    }
    static async create(activity) {
        const newActivity = new activity_model_1.default(activity);
        return await newActivity.save();
    }
    static async update(activity) {
        return await activity_model_1.default.findOneAndUpdate({ _id: activity._id }, {
            $set: activity
        }, { upsert: true });
    }
    static async delete(activity) {
        return await activity_model_1.default.findOneAndRemove(activity);
    }
}
exports.default = ActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L2FjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxzRUFBd0M7QUFFeEMsTUFBcUIsa0JBQWtCO0lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVc7UUFDbkMsT0FBTyxNQUFNLHdCQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRztRQUN0QixPQUFPLE1BQU0sd0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDMUMsT0FBTyxNQUFNLHdCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQW1CO1FBQzdDLE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxPQUFPLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFtQjtRQUM3QyxPQUFPLE1BQU0sd0JBQVEsQ0FBQyxnQkFBZ0IsQ0FDckMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUNyQjtZQUNDLElBQUksRUFBRSxRQUFRO1NBQ2QsRUFDRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDaEIsQ0FBQztJQUNILENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFhO1FBQ3ZDLE9BQU8sTUFBTSx3QkFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRDtBQTFCRCxxQ0EwQkMifQ==
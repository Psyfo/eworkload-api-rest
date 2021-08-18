"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const community_instruction_activity_model_1 = __importDefault(require("./community-instruction-activity.model"));
const CommunityInstructionActivityController = {
    async all(req, res, next) {
        try {
            const result = await community_instruction_activity_model_1.default.find();
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async byId(req, res, next) {
        try {
            const result = await community_instruction_activity_model_1.default.findOne({ _id: req.params._id });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async byUserId(req, res, next) {
        try {
            const result = await community_instruction_activity_model_1.default.findOne({ userId: req.params.userId });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async create(req, res, next) {
        try {
            const newCommunityInstructionActivity = await new community_instruction_activity_model_1.default(req.body).save();
            const result = await community_instruction_activity_model_1.default.findOne({ _id: newCommunityInstructionActivity._id });
            logger_config_1.logger.info('Object created');
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async update(req, res, next) {
        try {
            const result = await community_instruction_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
                $set: req.body
            }, { upsert: true });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            logger_config_1.logger.info('Object updated');
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async delete(req, res, next) {
        try {
            const result = await community_instruction_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            logger_config_1.logger.info('Object deleted');
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    }
};
exports.default = CommunityInstructionActivityController;
// export default class CommunityInstructionActivityController {
//   public static async communityInstructionActivity(activityId: string) {
//     return await CommunityInstructionActivity.findOne({
//       activityId: activityId
//     })
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty');
//   }
//   public static async communityInstructionActivities() {
//     return await CommunityInstructionActivity.find({})
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty');
//   }
//   public static async communityInstructionActivitiesByUser(userId: string) {
//     return await CommunityInstructionActivity.find({ userId: userId })
//       .populate({
//         path: 'user',
//         model: 'User',
//         populate: [
//           { path: 'disciplines', model: 'Discipline' },
//           { path: 'position', model: 'Position' },
//           { path: 'workFocus', model: 'WorkFocus' }
//         ]
//       })
//       .populate('duty');
//   }
//   public static async createCommunityInstructionActivity(
//     activity: ICommunityInstructionActivity
//   ) {
//     const newActivity = new CommunityInstructionActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateCommunityInstructionActivity(
//     activity: ICommunityInstructionActivity
//   ) {
//     return await CommunityInstructionActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deleteCommunityInstructionActivity(
//     activity: any
//   ) {
//     return await CommunityInstructionActivity.findOneAndRemove(activity);
//   }
//   public static async communityInstructionGlobalTarrif() {
//     return parameters.global_community_instruction_tarrif;
//   }
//   public static async communityInstructionTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: ICommunityInstructionActivity = (await this.communityInstructionActivity(
//       activityId
//     )) as ICommunityInstructionActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     return serviceHours / 10;
//   }
//   public static async communityInstructionTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.communityInstructionGlobalTarrif();
//     const activities: ICommunityInstructionActivity[] = (await this.communityInstructionActivitiesByUser(
//       userId
//     )) as ICommunityInstructionActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.communityInstructionTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async communityInstructionPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: ICommunityInstructionActivity = (await this.communityInstructionActivity(
//       activityId
//     )) as ICommunityInstructionActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.communityInstructionTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async communityInstructionPercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     const globalTarrif: number = await this.communityInstructionGlobalTarrif();
//     const serviceHours: number = await WorkFocusController.serviceHours(userId);
//     const activityHours: number =
//       (await this.communityInstructionTotalHoursPerUser(userId)) + globalTarrif;
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async communityInstructionPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     const activityHours: number = await this.communityInstructionTotalHoursPerActivity(
//       activityId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async communityInstructionPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: ICommunityInstructionActivity = (await this.communityInstructionActivity(
//       activityId
//     )) as ICommunityInstructionActivity;
//     const activityHours: number = await this.communityInstructionTotalHoursPerActivity(
//       activityId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async communityInstructionPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.communityInstructionTotalHoursPerUser(
//       userId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async communityInstructionPercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.communityInstructionTotalHoursPerUser(
//       userId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LWluc3RydWN0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9jb21tdW5pdHktaW5zdHJ1Y3Rpb24vY29tbXVuaXR5LWluc3RydWN0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3REFBZ0M7QUFFaEMsaUVBQXVEO0FBQ3ZELGtIQUFrRjtBQUVsRixNQUFNLHNDQUFzQyxHQUFHO0lBQzlDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN4RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSw4Q0FBNEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6RCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sOENBQTRCLENBQUMsT0FBTyxDQUFDLEVBQUUs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
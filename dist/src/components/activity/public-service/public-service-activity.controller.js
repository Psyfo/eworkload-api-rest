"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const public_service_activity_model_1 = __importDefault(require("./public-service-activity.model"));
const PublicServiceActivityController = {
    async all(req, res, next) {
        try {
            const result = await public_service_activity_model_1.default.find();
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
            const result = await public_service_activity_model_1.default.findOne({ _id: req.params._id });
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
            const result = await public_service_activity_model_1.default.findOne({ userId: req.params.userId });
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
            const newPublicServiceActivity = await new public_service_activity_model_1.default(req.body).save();
            const result = await public_service_activity_model_1.default.findOne({ _id: newPublicServiceActivity._id });
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
            const result = await public_service_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
            const result = await public_service_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
exports.default = PublicServiceActivityController;
// export default class PublicServiceActivityController {
//   public static async publicServiceActivity(activityId: string) {
//     return await PublicServiceActivity.findOne({ activityId: activityId })
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
//   public static async publicServiceActivities() {
//     return await PublicServiceActivity.find({})
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
//   public static async publicServiceActivitiesByUser(userId: string) {
//     return await PublicServiceActivity.find({ userId: userId })
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
//   public static async createPublicServiceActivity(
//     activity: IPublicServiceActivity
//   ) {
//     const newActivity = new PublicServiceActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updatePublicServiceActivity(
//     activity: IPublicServiceActivity
//   ) {
//     return await PublicServiceActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deletePublicServiceActivity(
//     activity: any
//   ) {
//     return await PublicServiceActivity.findOneAndRemove(activity);
//   }
//   public static async publicServiceGlobalTarrif() {
//     return parameters.global_public_service_tarrif;
//   }
//   public static async publicServiceTotalHoursPerActivity(activityId: string) {
//     const activity: IPublicServiceActivity = (await this.publicServiceActivity(
//       activityId
//     )) as IPublicServiceActivity;
//     const serviceHours = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     return serviceHours / 10;
//   }
//   public static async publicServiceTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.publicServiceGlobalTarrif();
//     const activities: IPublicServiceActivity[] = (await this.publicServiceActivitiesByUser(
//       userId
//     )) as IPublicServiceActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.publicServiceTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async publicServicePercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: IPublicServiceActivity = (await this.publicServiceActivity(
//       activityId
//     )) as IPublicServiceActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.publicServiceTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async publicServicePercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     const serviceHours: number = await WorkFocusController.serviceHours(userId);
//     const activityHours: number = await this.publicServiceTotalHoursPerUser(
//       userId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async publicServicePercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     const activityHours: number = await this.publicServiceTotalHoursPerActivity(
//       activityId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async publicServicePercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.publicServiceTotalHoursPerUser(
//       userId
//     );
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async publicServicePercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IPublicServiceActivity = (await this.publicServiceActivity(
//       activityId
//     )) as IPublicServiceActivity;
//     const activityHours: number = await this.publicServiceTotalHoursPerActivity(
//       activityId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async publicServicePercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     const activityHours: number = await this.publicServiceTotalHoursPerUser(
//       userId
//     );
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXNlcnZpY2UtYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L3B1YmxpYy1zZXJ2aWNlL3B1YmxpYy1zZXJ2aWNlLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFTQSx3REFBZ0M7QUFFaEMsaUVBQXVEO0FBQ3ZELG9HQUFvRTtBQUVwRSxNQUFNLCtCQUErQixHQUFHO0lBQ3ZDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN4RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sdUNBQXFCLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxN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
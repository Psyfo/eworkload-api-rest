"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const executive_management_activity_model_1 = __importDefault(require("./executive-management-activity.model"));
const ExecutiveManagementActivityController = {
    async all(req, res, next) {
        try {
            const result = await executive_management_activity_model_1.default.find();
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
            const result = await executive_management_activity_model_1.default.findOne({ _id: req.params._id });
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
            const result = await executive_management_activity_model_1.default.findOne({ userId: req.params.userId });
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
            const newExecutiveManagementActivity = await new executive_management_activity_model_1.default(req.body).save();
            const result = await executive_management_activity_model_1.default.findOne({ _id: newExecutiveManagementActivity._id });
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
            const result = await executive_management_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
            const result = await executive_management_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
exports.default = ExecutiveManagementActivityController;
// export default class ExecutiveManagementActivityController {
//   public static async executiveManagementActivity(activityId: string) {
//     return await ExecutiveManagementActivity.findOne({ activityId: activityId })
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
//   public static async executiveManagementActivities() {
//     return await ExecutiveManagementActivity.find({})
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
//   public static async executiveManagementActivitiesByUser(userId: string) {
//     return await ExecutiveManagementActivity.find({ userId: userId })
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
//   public static async createExecutiveManagementActivity(
//     activity: IExecutiveManagementActivity
//   ) {
//     const newActivity = new ExecutiveManagementActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateExecutiveManagementActivity(
//     activity: IExecutiveManagementActivity
//   ) {
//     return await ExecutiveManagementActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deleteExecutiveManagementActivity(
//     activity: any
//   ) {
//     return await ExecutiveManagementActivity.findOneAndRemove(activity);
//   }
//   public static async executiveManagementGlobalTarrif() {
//     return parameters.global_executive_management_tarrif;
//   }
//   public static async executiveManagementTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
//       activityId
//     )) as IExecutiveManagementActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     return serviceHours / 10;
//   }
//   public static async executiveManagementTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.executiveManagementGlobalTarrif();
//     const activities: IExecutiveManagementActivity[] = (await this.executiveManagementActivitiesByUser(
//       userId
//     )) as IExecutiveManagementActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.executiveManagementTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async executiveManagementPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
//       activityId
//     )) as IExecutiveManagementActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.executiveManagementTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async executiveManagementPercentageOfWorkFocusPerUser(
//     userId: string
//   ) {
//     let globalTarrif: number = await this.executiveManagementGlobalTarrif();
//     let serviceHours: number = await WorkFocusController.serviceHours(userId);
//     let activityHours: number =
//       (await this.executiveManagementTotalHoursPerUser(userId)) + globalTarrif;
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async executiveManagementPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     let activityHours: number = await this.executiveManagementTotalHoursPerActivity(
//       activityId
//     );
//     let annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async executiveManagementPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
//       activityId
//     )) as IExecutiveManagementActivity;
//     const activityHours: number = await this.executiveManagementTotalHoursPerActivity(
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
//   public static async executiveManagementPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     const activityHours = await this.executiveManagementTotalHoursPerUser(
//       userId
//     );
//     const annualHours = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async executiveManagementPercentageOfTotalHoursPerUser(
//     userId: string
//   ) {
//     const activityHours = await this.executiveManagementTotalHoursPerUser(
//       userId
//     );
//     const totalHours = await WorkloadController.totalHoursPerUser(userId);
//     if (totalHours === undefined) {
//       throw new Error('Total hours did not come through');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0aXZlLW1hbmFnZW1lbnQtYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L2V4ZWN1dGl2ZS1tYW5hZ2VtZW50L2V4ZWN1dGl2ZS1tYW5hZ2VtZW50LWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3REFBZ0M7QUFFaEMsaUVBQXVEO0FBQ3ZELGdIQUFnRjtBQUVoRixNQUFNLHFDQUFxQyxHQUFHO0lBQzdDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN4RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSw2Q0FBMkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sNkNBQTJCLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FB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
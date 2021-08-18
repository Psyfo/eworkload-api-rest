"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const research_activity_model_1 = __importDefault(require("./research-activity.model"));
const ResearchActivityController = {
    async all(req, res, next) {
        try {
            const result = await research_activity_model_1.default.find();
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
            const result = await research_activity_model_1.default.findOne({ _id: req.params._id });
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
            const result = await research_activity_model_1.default.findOne({ userId: req.params.userId });
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
            const newResearchActivity = await new research_activity_model_1.default(req.body).save();
            const result = await research_activity_model_1.default.findOne({ _id: newResearchActivity._id });
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
            const result = await research_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
            const result = await research_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
exports.default = ResearchActivityController;
// export default class ResearchActivityController {
//   public static async researchActivity(activityId: string) {
//     return await ResearchActivity.findOne({ activityId: activityId })
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
//   public static async researchActivities() {
//     return await ResearchActivity.find({})
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
//   public static async researchActivitiesByUser(userId: string) {
//     return await ResearchActivity.find({ userId: userId })
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
//   public static async createResearchActivity(activity: IResearchActivity) {
//     const newActivity = new ResearchActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateResearchActivity(activity: IResearchActivity) {
//     return await ResearchActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deleteResearchActivity(activity: any) {
//     return await ResearchActivity.findOneAndRemove(activity);
//   }
//   public static async researchGlobalTarrif() {
//     return parameters.global_research_tarrif;
//   }
//   public static async researchTotalHoursPerActivity(activityId: string) {
//     const activity: any = await this.researchActivity(activityId);
//     let totalHours: number = 60;
//     if (activity.output === 'Conference Proceedings') {
//       if (
//         activity.conferenceActivities.find(
//           (detail: string) => detail === 'Presented Paper'
//         )
//       ) {
//         totalHours = 60;
//       } else if (
//         activity.conferenceActivities.find(
//           (detail: string) => detail === 'Keynote address'
//         )
//       ) {
//         totalHours = 120;
//       }
//     } else if (activity.output === 'Journal') {
//       totalHours === 120;
//     } else {
//       totalHours = 60;
//     }
//     return totalHours;
//   }
//   public static async researchTotalHoursPerUser(userId: string) {
//     const globalTarrif: number = await this.researchGlobalTarrif();
//     const activities: IResearchActivity[] = (await this.researchActivitiesByUser(
//       userId
//     )) as IResearchActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.researchTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours + globalTarrif;
//   }
//   public static async researchPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     const activity: IResearchActivity = (await this.researchActivity(
//       activityId
//     )) as IResearchActivity;
//     const serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     const activityHours: number = await this.researchTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async researchPercentageOfWorkFocusPerUser(userId: string) {
//     const serviceHours: number = await WorkFocusController.serviceHours(userId);
//     const activityHours: number = await this.researchTotalHoursPerUser(userId);
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async researchPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     const activityHours = await this.researchTotalHoursPerActivity(activityId);
//     const annualHours = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async researchPercentageOfAnnualHoursPerUser(userId: string) {
//     const activityHours: number = await this.researchTotalHoursPerUser(userId);
//     const annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async researchPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     const activity: IResearchActivity = (await this.researchActivity(
//       activityId
//     )) as IResearchActivity;
//     const activityHours: number = await this.researchTotalHoursPerActivity(
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
//   public static async researchPercentageOfTotalHoursPerUser(userId: string) {
//     const activityHours: number = await this.researchTotalHoursPerUser(userId);
//     const totalHours: number = await WorkloadController.totalHoursPerUser(
//       userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZWFyY2gtYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L3Jlc2VhcmNoL3Jlc2VhcmNoLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSx3REFBZ0M7QUFFaEMsaUVBQXVEO0FBQ3ZELHdGQUF5RDtBQUV6RCxNQUFNLDBCQUEwQixHQUFHO0lBQ2xDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN4RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxpQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0saUNBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFF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
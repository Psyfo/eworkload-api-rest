"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const work_focus_controller_1 = __importDefault(require("../../work-focus/work-focus.controller"));
const supervision_activity_model_1 = __importDefault(require("./supervision-activity.model"));
const SupervisionActivityController = {
    async all(req, res, next) {
        try {
            const result = await supervision_activity_model_1.default.find().populate('user').populate('student');
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
            const result = await (await supervision_activity_model_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(req.params._id) }))
                .populate('user')
                .populate('student');
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            await SupervisionActivityController.calcWorkload(result._id);
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async byUserId(req, res, next) {
        try {
            const result = await supervision_activity_model_1.default.findOne({ userId: req.params.userId });
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
            const newSupervisionActivity = await new supervision_activity_model_1.default(req.body);
            newSupervisionActivity.split = 100;
            await newSupervisionActivity.save();
            const result = await supervision_activity_model_1.default.findOne({ _id: newSupervisionActivity._id });
            logger_config_1.logger.info('Object created');
            //update workload
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async update(req, res, next) {
        try {
            const result = await supervision_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
                $set: req.body
            }, { upsert: true });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            logger_config_1.logger.info('Object updated');
            await SupervisionActivityController.calcWorkload(result._id);
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    async delete(req, res, next) {
        try {
            const result = await supervision_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
    },
    async totalHours(activity) {
        const totalHours = 100;
        // if (activity.split !== 100) {
        //   totalHours *= activity.split / 100;
        // }
        return totalHours;
    },
    async percentageOfTeaching(activity) {
        return ((await this.totalHours(activity)) / (await work_focus_controller_1.default.teachingHours(activity.userId))) * 100;
    },
    async percentageOfAnnual(activity) {
        return ((await this.totalHours(activity)) / (await work_focus_controller_1.default.annualHours())) * 100;
    },
    async calcWorkload(activities) {
        try {
            // Use activity to calculate workload
            // const activity:any = await SupervisionActivity.findOne({ _id: mongoose.Types.ObjectId(activity._id) })
            //   .populate('user')
            //   .populate('duty')
            //   .populate('student');
            // if (!activity) {
            //   logger.error('Activity not found');
            // }
            if (!activities.length) {
                console.log('No Supervision Activities to calculate');
                return;
            }
            activities.map(async (activity) => {
                const workload = {
                    total: await SupervisionActivityController.totalHours(activity),
                    percentageOfTeaching: await SupervisionActivityController.percentageOfTeaching(activity),
                    percentageOfAnnual: await SupervisionActivityController.percentageOfAnnual(activity)
                };
                await supervision_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(activity._id) }, {
                    $set: {
                        workload: workload
                    }
                }, { upsert: true });
            });
            // for (let activity of activities) {
            //   const workload: ISupervisionWorkload = {
            //     total: await SupervisionActivityController.totalHours(activity),
            //     percentageOfTeaching: await SupervisionActivityController.percentageOfTeaching(activity),
            //     percentageOfAnnual: await SupervisionActivityController.percentageOfAnnual(activity)
            //   };
            //   // Update activity with workload
            //
            // }
            //logger.info('supervision workload updated');
        }
        catch (error) {
            logger_config_1.logger.error(error);
        }
    }
};
exports.default = SupervisionActivityController;
// export default class SupervisionActivityController {
//   public static async supervisionActivity(activityId: string) {
//     return await SupervisionActivity.findOne({ activityId: activityId })
//       .populate('user')
//       .populate('duty')
//       .populate('student');
//   }
//   public static async supervisionActivities() {
//     return await SupervisionActivity.find({})
//       .populate('user')
//       .populate('duty')
//       .populate('student');
//   }
//   public static async supervisionActivitiesByUser(userId: string) {
//     return await SupervisionActivity.find({ userId: userId })
//       .populate('user')
//       .populate('duty')
//       .populate('student');
//   }
//   public static async createSupervisionActivity(
//     activity: ISupervisionActivity
//   ) {
//     const newActivity = new SupervisionActivity(activity);
//     return await newActivity.save();
//   }
//   public static async updateSupervisionActivity(
//     activity: ISupervisionActivity
//   ) {
//     return await SupervisionActivity.findOneAndUpdate(
//       { activityId: activity.activityId },
//       {
//         $set: activity
//       },
//       { upsert: true }
//     );
//   }
//   public static async deleteSupervisionActivity(
//     activity: any
//   ) {
//     return await SupervisionActivity.findOneAndRemove(activity);
//   }
//   public static async supervisionTotalHoursPerActivity(activityId: string) {
//     const activity: ISupervisionActivity = (await this.supervisionActivity(
//       activityId
//     )) as ISupervisionActivity;
//     let totalHours: number = 100;
//     if (activity.split !== 100) {
//       totalHours *= activity.split / 100;
//     }
//     return totalHours;
//   }
//   public static async supervisionTotalHoursPerUser(userId: string) {
//     const activities: ISupervisionActivity[] = (await this.supervisionActivitiesByUser(
//       userId
//     )) as ISupervisionActivity[];
//     let activityHours: number = 0;
//     for (let activity of activities) {
//       activityHours += await this.supervisionTotalHoursPerActivity(
//         activity.activityId
//       );
//     }
//     return activityHours;
//   }
//   public static async supervisionPercentageOfWorkFocusPerActivity(
//     activityId: string
//   ) {
//     let activity: ISupervisionActivity = (await this.supervisionActivity(
//       activityId
//     )) as ISupervisionActivity;
//     let serviceHours: number = await WorkFocusController.serviceHours(
//       activity.userId
//     );
//     let activityHours: number = await this.supervisionTotalHoursPerActivity(
//       activityId
//     );
//     return (activityHours / serviceHours) * 100;
//   }
//   public static async supervisionPercentageOfWorkFocusPerUser(userId: string) {
//     let teachingHours: number = await WorkFocusController.teachingHours(userId);
//     let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
//     return (activityHours / teachingHours) * 100;
//   }
//   public static async supervisionPercentageOfAnnualHoursPerActivity(
//     activityId: string
//   ) {
//     let activityHours: number = await this.supervisionTotalHoursPerActivity(
//       activityId
//     );
//     let annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async supervisionPercentageOfAnnualHoursPerUser(
//     userId: string
//   ) {
//     let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
//     let annualHours: number = parameters.annual_total_hours;
//     return (activityHours / annualHours) * 100;
//   }
//   public static async supervisionPercentageOfTotalHoursPerActivity(
//     activityId: string
//   ) {
//     let activity: ISupervisionActivity = (await this.supervisionActivity(
//       activityId
//     )) as ISupervisionActivity;
//     let activityHours: number = 0;
//     activityHours = await this.supervisionTotalHoursPerActivity(activityId);
//     let totalHours: number = await WorkloadController.totalHoursPerUser(
//       activity.userId
//     );
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
//   public static async supervisionPercentageOfTotalHoursPerUser(userId: string) {
//     let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
//     let totalHours: number = await WorkloadController.totalHoursPerUser(userId);
//     if (totalHours === undefined) {
//       throw new Error('Total hours is undefined');
//     }
//     return (activityHours / totalHours) * 100;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNpb24tYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L3N1cGVydmlzaW9uL3N1cGVydmlzaW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx3REFBZ0M7QUFDaEMsaUVBQXVEO0FBQ3ZELG1HQUF5RTtBQUd6RSw4RkFBK0Q7QUFFL0QsTUFBTSw2QkFBNkIsR0FBRztJQUNyQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDeEQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sb0NBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFH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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const work_focus_controller_1 = __importDefault(require("../../work-focus/work-focus.controller"));
const formal_instruction_activity_model_1 = __importDefault(require("./formal-instruction-activity.model"));
const FormalInstructionActivityController = {
    async all(req, res, next) {
        try {
            const result = await formal_instruction_activity_model_1.default.find({})
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' },
                    { path: 'department', model: 'Department' }
                ]
            })
                .populate('duty')
                .populate({
                path: 'group',
                model: 'Group',
                populate: [{ path: 'modules', model: 'Module', populate: [{ path: 'block' }] }]
            });
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
            const result = await formal_instruction_activity_model_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(req.params._id) })
                .populate('user')
                .populate('duty')
                .populate({
                path: 'group',
                populate: [
                    {
                        path: 'modules',
                        populate: [
                            { path: 'block' },
                            { path: 'offering-type' },
                            { path: 'department' },
                            { path: 'qualification' }
                        ]
                    }
                ]
            });
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
            const result = await formal_instruction_activity_model_1.default.find({ userId: req.params.userId })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' },
                    { path: 'department', model: 'Department' }
                ]
            })
                .populate('duty')
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [
                        { path: 'block' },
                        { path: 'offeringType' },
                        { path: 'qualification' },
                        { path: 'discipline' },
                        { path: 'venue' }
                    ]
                }
            });
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
            const newFormalInstructionActivity = new formal_instruction_activity_model_1.default(req.body);
            await newFormalInstructionActivity.save();
            const result = await formal_instruction_activity_model_1.default.findOne({
                _id: newFormalInstructionActivity._id
            })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' },
                    { path: 'department', model: 'Department' }
                ]
            })
                .populate('duty')
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [
                        { path: 'formalInstructionActivity' },
                        { path: 'offeringType' },
                        { path: 'qualification' },
                        { path: 'discipline' },
                        { path: 'venue' }
                    ]
                }
            });
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
            const result = await formal_instruction_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
                $set: req.body
            }, { upsert: true })
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' },
                    { path: 'department', model: 'Department' }
                ]
            })
                .populate('duty')
                .populate({
                path: 'group',
                populate: {
                    path: 'module',
                    populate: [
                        { path: 'formalInstructionActivity' },
                        { path: 'offeringType' },
                        { path: 'qualification' },
                        { path: 'discipline' },
                        { path: 'venue' }
                    ]
                }
            });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            // update workload
            //await this.calcWorkload(result._id);
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
            const result = await formal_instruction_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id))
                .populate({
                path: 'user',
                model: 'User',
                populate: [
                    { path: 'disciplines', model: 'Discipline' },
                    { path: 'position', model: 'Position' },
                    { path: 'workFocus', model: 'WorkFocus' },
                    { path: 'department', model: 'Department' }
                ]
            })
                .populate('duty')
                .populate('group');
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
    async baseContact(activity) {
        try {
            if (activity === undefined) {
                logger_config_1.logger.error('Activity undefined in baseContact');
            }
            return +((activity.group.modules[0].credits / 4) * activity.group.modules[0].block.weeks);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
        }
    },
    async coordination(activity) {
        try {
            let coordination = 0;
            if (activity.userId === activity.group.coordinatorId) {
                coordination = 5;
                coordination += (activity.group.studentsEnrolled - 100) / 40;
            }
            return coordination;
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
        }
    },
    async studentSupport(activity) {
        try {
            return ((0.1 * activity.group.studentsEnrolled * activity.group.modules[0].credits) /
                activity.group.modules[0].block.weeks /
                activity.group.modularity);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
        }
    },
    async preparationTime(activity) {
        try {
            return (((await this.baseContact(activity)) * (activity.group.modules[0].nqfLevel - 4)) / activity.group.modularity);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
        }
    },
    async assessmentSetting(activity) {
        try {
            return ((((10 * activity.group.modules[0].credits) / activity.group.modules[0].block.weeks) *
                (activity.group.modules[0].nqfLevel - 4)) /
                activity.group.modularity);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
        }
    },
    async examMarking(activity) {
        return ((0.25 *
            activity.group.studentsEnrolled *
            (activity.group.modules[0].credits / activity.group.modules[0].block.weeks) *
            (activity.group.modules[0].nqfLevel - 4)) /
            2 /
            activity.group.modularity);
    },
    async courseworkMarking(activity) {
        return ((0.5 *
            activity.group.studentsEnrolled *
            (activity.group.modules[0].credits / activity.group.modules[0].block.weeks)) /
            activity.group.modularity);
    },
    async feedback(activity) {
        return ((1 *
            activity?.group?.studentsEnrolled *
            (activity.group.modules[0].credits / activity.group.modules[0].block.weeks)) /
            activity.group.modularity);
    },
    async formativeAssessment(activity) {
        return ((0.4 *
            activity.group.studentsEnrolled *
            (activity.group.modules[0].credits / activity.group.modules[0].block.weeks)) /
            activity.group.modularity);
    },
    async moderation(activity) { },
    async otherHours(activity) {
        try {
            return await ((await this.coordination(activity)) +
                (await this.studentSupport(activity)) +
                (await this.preparationTime(activity)) +
                (await this.assessmentSetting(activity)) +
                (await this.examMarking(activity)) +
                (await this.courseworkMarking(activity)) +
                (await this.feedback(activity)) +
                (await this.formativeAssessment(activity)));
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
        }
    },
    async totalHours(activity) {
        return (await this.baseContact(activity)) + (await this.otherHours(activity));
    },
    async percentageOfTeaching(activity) {
        return ((await this.totalHours(activity)) / (await work_focus_controller_1.default.teachingHours(activity.userId))) * 100;
    },
    async percentageOfAnnual(activity) {
        return ((await this.totalHours(activity)) / (await work_focus_controller_1.default.annualHours())) * 100;
    },
    async calcWorkload(activities) {
        try {
            if (!activities.length) {
                logger_config_1.logger.error('No FI activities to calculate');
            }
            activities.map(async (activity) => {
                const workload = {
                    baseContact: await FormalInstructionActivityController.baseContact(activity),
                    coordination: await FormalInstructionActivityController.coordination(activity),
                    studentSupport: await FormalInstructionActivityController.studentSupport(activity),
                    preparationTime: await FormalInstructionActivityController.preparationTime(activity),
                    assessmentSetting: await FormalInstructionActivityController.assessmentSetting(activity),
                    examMarking: await FormalInstructionActivityController.examMarking(activity),
                    courseworkMarking: await FormalInstructionActivityController.courseworkMarking(activity),
                    feedback: await FormalInstructionActivityController.feedback(activity),
                    formativeAssessment: await FormalInstructionActivityController.formativeAssessment(activity),
                    other: await FormalInstructionActivityController.otherHours(activity),
                    total: await FormalInstructionActivityController.totalHours(activity),
                    percentageOfTeaching: await FormalInstructionActivityController.percentageOfTeaching(activity),
                    percentageOfAnnual: await FormalInstructionActivityController.percentageOfAnnual(activity)
                };
                await formal_instruction_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(activity._id) }, {
                    $set: {
                        workload: workload
                    }
                }, { upsert: true });
            });
        }
        catch (error) {
            logger_config_1.logger.error(error);
        }
    }
};
exports.default = FormalInstructionActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9mb3JtYWwtaW5zdHJ1Y3Rpb24vZm9ybWFsLWluc3RydWN0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3REFBZ0M7QUFHaEMsaUVBQXVEO0FBS3ZELG1HQUF5RTtBQUd6RSw0R0FBNEU7QUFFNUUsTUFBTSxtQ0FBbUMsR0FBRztJQUMxQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDdkQsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sMkNBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDcEQsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDNUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUN6QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtpQkFDNUM7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsT0FBTztnQkFDZCxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFP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
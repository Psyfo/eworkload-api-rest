"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../config/logger.config");
const module_model_1 = __importDefault(require("./module.model"));
const ModuleController = {
    async all(req, res, next) {
        try {
            const result = await module_model_1.default.find().populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
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
            const result = await module_model_1.default.findOne({ _id: req.params._id }).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
    async byDiscipline(req, res, next) {
        try {
            const result = await module_model_1.default.find({ disciplineId: req.params.discipline }).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
    async byQualification(req, res, next) {
        try {
            const result = await module_model_1.default.find({ qualificationId: req.params.qualificationId }).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
    async byCoordinator(req, res, next) {
        try {
            const result = await module_model_1.default.find({ coordinatorId: req.params.coordinatorId }).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
            const newModule = await new module_model_1.default(req.body).save();
            const result = await module_model_1.default.findOne({ _id: newModule._id }).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
            const result = await module_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
                $set: req.body
            }, { upsert: true }).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
            const result = await module_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id)).populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block');
            ;
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
};
exports.default = ModuleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9tb2R1bGUvbW9kdWxlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx3REFBZ0M7QUFFaEMsOERBQW9EO0FBRXBELGtFQUFvQztBQUVwQyxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN2RCxJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQ3hELFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsZUFBZTtnQkFDckIsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsU0FBUztxQkFDakI7aUJBQ0Y7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxjQUFjLENBQUM7aUJBQ3hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVuQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxD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
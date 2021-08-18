"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../config/logger.config");
const group_model_1 = __importDefault(require("./group.model"));
class GroupController {
}
GroupController.all = async (req, res) => {
    try {
        const result = await group_model_1.default.find().populate({
            path: 'modules',
            populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
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
};
GroupController.byId = async (req, res) => {
    try {
        const result = await group_model_1.default.findOne({ _id: req.params._id }).populate({
            path: 'module',
            populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
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
};
GroupController.byModuleId = async (req, res) => {
    try {
        const result = await group_model_1.default.find({ moduleId: req.params.moduleId }).populate({
            path: 'module',
            populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
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
};
GroupController.create = async (req, res) => {
    try {
        const newGroup = new group_model_1.default(req.body);
        await newGroup.save();
        const result = await group_model_1.default.findOne({ _id: newGroup._id }).populate({
            path: 'module',
            populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
        });
        logger_config_1.logger.info('Object created');
        return res.status(200).json(result);
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};
GroupController.update = async (req, res) => {
    try {
        const result = await group_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
            $set: req.body
        }, { upsert: true }).populate({
            path: 'module',
            populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
        });
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
};
GroupController.delete = async (req, res) => {
    try {
        const result = await group_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id)).populate({
            path: 'module',
            populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
        });
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
};
exports.default = GroupController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2dyb3VwL2dyb3VwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNEQUFzRDtBQUN0RCw0REFBNEQ7QUFDNUQsK0RBQStEO0FBQy9ELHVEQUF1RDs7Ozs7QUFHdkQsd0RBQWdDO0FBQ2hDLDhEQUFvRDtBQUVwRCxnRUFBa0M7QUFFbEMsTUFBTSxlQUFlOztBQUNiLG1CQUFHLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQStDLEVBQUU7SUFDL0YsSUFBSTtRQUNILE1BQU0sTUFBTSxHQUFhLE1BQU0scUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDcEQsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQztTQUMzRyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDcEIsc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVB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
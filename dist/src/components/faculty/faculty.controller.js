"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../config/logger.config");
const faculty_model_1 = __importDefault(require("./faculty.model"));
class FacultyController {
}
FacultyController.all = async (req, res) => {
    try {
        const result = await faculty_model_1.default.find();
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
FacultyController.byId = async (req, res) => {
    try {
        const result = await faculty_model_1.default.findOne({ _id: req.params._id });
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
FacultyController.create = async (req, res) => {
    try {
        const newFaculty = new faculty_model_1.default(req.body);
        await newFaculty.save();
        const result = await faculty_model_1.default.findOne({ _id: newFaculty._id });
        logger_config_1.logger.info('Object created');
        return res.status(200).json(result);
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};
FacultyController.update = async (req, res) => {
    try {
        const result = await faculty_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
};
FacultyController.delete = async (req, res) => {
    try {
        const result = await faculty_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
exports.default = FacultyController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdWx0eS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZmFjdWx0eS9mYWN1bHR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3REFBZ0M7QUFDaEMsOERBQW9EO0FBRXBELG9FQUFzQztBQUV0QyxNQUFNLGlCQUFpQjs7QUFDZixxQkFBRyxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUErQyxFQUFFO0lBQy9GLElBQUk7UUFDSCxNQUFNLE1BQU0sR0FBZSxNQUFNLHVCQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztLQUN6RDtBQUNGLENBQUMsQ0FBQztBQUNLLHNCQUFJLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQStDLEVBQUU7SUFDaEcsSUFBSTtRQUNILE1BQU0sTUFBTSxHQUFhLE1BQU0sdUJBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxNQUFNLEVB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
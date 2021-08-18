"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("src/config/logger.config");
const discipline_model_1 = __importDefault(require("./discipline.model"));
class DisciplineController {
}
DisciplineController.all = async (req, res) => {
    try {
        const result = await discipline_model_1.default.find({}).populate('faculty');
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
DisciplineController.byId = async (req, res) => {
    try {
        const result = await discipline_model_1.default.findOne({ _id: req.params._id });
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
DisciplineController.byDisciplineId = async (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const result = await discipline_model_1.default.findOne({ disciplineId: req.params.disciplineId }).populate('faculty');
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
DisciplineController.byFacultyId = async (req, res) => {
    try {
        const result = await discipline_model_1.default.find({ facultyId: req.params.facultyId });
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
DisciplineController.create = async (req, res) => {
    try {
        const newDiscipline = new discipline_model_1.default(req.body);
        await newDiscipline.save();
        const result = await discipline_model_1.default.findOne({ _id: newDiscipline._id });
        logger_config_1.logger.info('Object created');
        return res.status(200).json(result);
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};
DisciplineController.update = async (req, res) => {
    try {
        const result = await discipline_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
DisciplineController.delete = async (req, res) => {
    try {
        const result = await discipline_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
exports.default = DisciplineController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY2lwbGluZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGlzY2lwbGluZS9kaXNjaXBsaW5lLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSx3REFBZ0M7QUFDaEMsNERBQWtEO0FBRWxELDBFQUE0QztBQUU1QyxNQUFNLG9CQUFvQjs7QUFDbEIsd0JBQUcsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBK0MsRUFBRTtJQUMvRixJQUFJO1FBQ0gsTUFBTSxNQUFNLEdBQWtCLE1BQU0sMEJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNmLHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDekQ7QUFDRixDQUFDLENBQUM7QUFDSyx5QkFBSSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUErQyxFQUFFO0lBQ2hHLElBQUk7UUFDSCxNQUFNLE1BQU0sR0FBZ0IsTUFBTSwwQkFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxD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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../../config/logger.config");
const academic_administration_activity_model_1 = __importDefault(require("./academic-administration-activity.model"));
const AcademicAdministrationActivityController = {
    async all(req, res, next) {
        try {
            const result = await academic_administration_activity_model_1.default.find();
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
            const result = await academic_administration_activity_model_1.default.findOne({ _id: req.params._id });
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
            const result = await academic_administration_activity_model_1.default.findOne({ userId: req.params.userId });
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
            const newAcademicAdministrationActivity = await new academic_administration_activity_model_1.default(req.body).save();
            const result = await academic_administration_activity_model_1.default.findOne({ _id: newAcademicAdministrationActivity._id });
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
            const result = await academic_administration_activity_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
            const result = await academic_administration_activity_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
exports.default = AcademicAdministrationActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24tYWN0aXZpdHkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L2FjYWRlbWljLWFkbWluaXN0cmF0aW9uL2FjYWRlbWljLWFkbWluaXN0cmF0aW9uLWFjdGl2aXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3REFBZ0M7QUFFaEMsaUVBQXVEO0FBQ3ZELHNIQUFzRjtBQUV0RixNQUFNLHdDQUF3QyxHQUFHO0lBQ2hELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN4RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxnREFBOEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0RBQThCLENBQUMsT0FBTyxDQUFD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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../config/logger.config");
const block_model_1 = __importDefault(require("./block.model"));
class BlockController {
}
BlockController.all = async (req, res) => {
    try {
        const result = await block_model_1.default.find();
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
BlockController.byId = async (req, res) => {
    try {
        const result = await block_model_1.default.findOne({ _id: req.params._id });
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
BlockController.byBlockId = async (req, res) => {
    try {
        const result = await block_model_1.default.findOne({ blockId: req.params.blockId });
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
BlockController.create = async (req, res) => {
    try {
        const newBlock = new block_model_1.default(req.body);
        await newBlock.save();
        const result = await block_model_1.default.findOne({ _id: newBlock._id });
        logger_config_1.logger.info('Object created');
        return res.status(200).json(result);
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};
BlockController.update = async (req, res) => {
    try {
        const result = await block_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
BlockController.delete = async (req, res) => {
    try {
        const result = await block_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
        if (!result) {
            return res.status(400).json({ message: 'No result found' });
        }
        logger_config_1.logger.info('Object deleted');
        0;
        return res.status(200).json(result);
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.default = BlockController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jsb2NrL2Jsb2NrLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx3REFBZ0M7QUFDaEMsOERBQW9EO0FBRXBELGdFQUFrQztBQUVsQyxNQUFNLGVBQWU7O0FBQ2IsbUJBQUcsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBK0MsRUFBRTtJQUMvRixJQUFJO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNmLHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDekQ7QUFDRixDQUFDLENBQUM7QUFDSyxvQkFBSSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUErQyxFQUFFO0lBQ2hHLElBQUk7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1os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
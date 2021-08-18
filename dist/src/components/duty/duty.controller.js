"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("../../config/logger.config");
const duty_model_1 = __importDefault(require("./duty.model"));
class DutyController {
}
DutyController.all = async (req, res) => {
    try {
        const result = await duty_model_1.default.find();
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
DutyController.byId = async (req, res) => {
    try {
        const result = await duty_model_1.default.findOne({ _id: req.params._id });
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
DutyController.create = async (req, res) => {
    try {
        const newDuty = new duty_model_1.default(req.body);
        await newDuty.save();
        const result = await duty_model_1.default.findOne({ _id: newDuty._id });
        logger_config_1.logger.info('Object created');
        return res.status(200).json(result);
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};
DutyController.update = async (req, res) => {
    try {
        const result = await duty_model_1.default.findByIdAndUpdate({ _id: mongoose_1.default.Types.ObjectId(req.body._id) }, {
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
DutyController.delete = async (req, res) => {
    try {
        const result = await duty_model_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(req.body._id));
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
;
exports.default = DutyController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHV0eS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZHV0eS9kdXR5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBNEQ7QUFDNUQsK0RBQStEO0FBQy9ELHVEQUF1RDtBQUN2RCx3REFBZ0M7QUFHaEMsOERBQW9EO0FBRXBELDhEQUFnQztBQUVoQyxNQUFNLGNBQWM7O0FBQ1Ysa0JBQUcsR0FBRyxLQUFLLEVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBK0MsRUFBRTtJQUM5RixJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQVksTUFBTSxvQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztTQUM3RDtRQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDMUQ7QUFDSCxDQUFDLENBQUE7QUFDTyxtQkFBSSxHQUFHLEtBQUssRUFBQyxHQUFZLEVBQUUsR0FBYSxFQUErQyxFQUFFO0lBQy9GLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBUyxNQUFNLG9CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0FBQ0gsQ0FBQyxDQUFBO0FBQ08scUJBQU0sR0FBRyxLQUFLLEVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBK0MsRUFBRTtJQUNqRyxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQVUsSUFBSSxvQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixNQUFNLE1BQU0sR0FBRyxNQUFNLG9CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELHNCQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2Qsc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztLQUMxRDtBQUNILENBQUMsQ0FBQTtBQUNPLHFCQUFNLEdBQUcsS0FBSyxFQUFDLEdBQVksRUFBRSxHQUFhLEVBQStDLEVBQUU7SUFDakcsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFTLE1BQU0sb0JBQUksQ0FBQyxpQkFBaUIsQ0FDL0MsRUFBRSxHQUFHLEVBQUUsa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFDOUM7WUFDRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7U0FDZixFQUNELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNqQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBQ0Qsc0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0FBQ0gsQ0FBQyxDQUFBO0FBQ08scUJBQU0sR0FBRyxLQUFLLEVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBK0MsRUFBRTtJQUNqRyxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQVUsTUFBTSxvQkFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBQ0Qsc0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0FBQ0gsQ0FBQyxDQUFBO0FBQ0YsQ0FBQztBQUVGLGtCQUFlLGNBQWMsQ0FBQyJ9
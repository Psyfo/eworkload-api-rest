"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_config_1 = require("../../config/logger.config");
const parameters_config_1 = __importDefault(require("../../config/parameters.config"));
const user_model_1 = __importDefault(require("../user/user.model"));
const work_focus_model_1 = __importDefault(require("./work-focus.model"));
const WorkFocusController = {
    async workFocus(name) {
        return await work_focus_model_1.default.findOne({ name: name });
    },
    async workFocuses() {
        return await work_focus_model_1.default.find({});
    },
    async teachingHours(userId) {
        const user = await user_model_1.default.findOne({ userId: userId }).populate('work-focus');
        const workFocus = (await this.workFocus(user.workFocusName));
        const teachingFocusPercentage = workFocus.teachingRatio;
        return (teachingFocusPercentage / 100) * parameters_config_1.default.annual_total_hours;
    },
    async researchHours(userId) {
        const user = await user_model_1.default.findOne({ userId: userId }).populate('work-focus');
        const workFocus = (await this.workFocus(user.workFocusName));
        const researchFocusPercentage = workFocus.researchRatio;
        return (researchFocusPercentage / 100) * parameters_config_1.default.annual_total_hours;
    },
    async serviceHours(userId) {
        const user = await user_model_1.default.findOne({ userId: userId }).populate('work-focus');
        const workFocus = (await this.workFocus(user.workFocusName));
        const serviceFocusPercentage = workFocus.serviceRatio;
        return (serviceFocusPercentage / 100) * parameters_config_1.default.annual_total_hours;
    },
    async annualHours() {
        return parameters_config_1.default.annual_total_hours;
    },
    // async createWorkFocus(workFocus: IWorkFocus) {
    //   return await workFocus.save();
    // },
    async updateWorkFocus(workFocus) {
        return await work_focus_model_1.default.findOneAndUpdate({ name: workFocus.name }, {
            $set: workFocus
        }, { upsert: true });
    },
    async deleteWorkFocus(workFocus) {
        return await work_focus_model_1.default.findOneAndRemove({ _id: workFocus._id });
    },
    async all(req, res, next) {
        try {
            const result = await work_focus_model_1.default.find({});
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).send('Server Error');
        }
    },
    async byId(req, res, next) {
        try {
            const result = await work_focus_model_1.default.findOne({ _id: req.params._id });
            if (!result) {
                return res.status(400).json({ message: 'No result found' });
            }
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).send('Server Error');
        }
    },
    async create(req, res, next) {
        try {
            const newWorkFocus = await new work_focus_model_1.default(req.body).save();
            const result = await work_focus_model_1.default.findOne({ _id: newWorkFocus._id });
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).send('Server Error');
        }
    },
    async update(req, res, next) {
        try {
            const result = await work_focus_model_1.default.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true });
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).send('Server Error');
        }
    },
    async delete(req, res, next) {
        try {
            const result = await work_focus_model_1.default.findOneAndRemove({ _id: req.body._id });
            return res.status(200).json(result);
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            return res.status(500).send('Server Error');
        }
    }
};
exports.default = WorkFocusController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mb2N1cy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvd29yay1mb2N1cy93b3JrLWZvY3VzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSw4REFBb0Q7QUFDcEQsdUZBQXdEO0FBRXhELG9FQUFzQztBQUV0QywwRUFBMkM7QUFFM0MsTUFBTSxtQkFBbUIsR0FBRztJQUMzQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDM0IsT0FBTyxNQUFNLDBCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELEtBQUssQ0FBQyxXQUFXO1FBQ2hCLE9BQU8sTUFBTSwwQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFjO1FBQ2pDLE1BQU0sSUFBSSxHQUFVLE1BQU0sb0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEYsTUFBTSxTQUFTLEdBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFlLENBQUM7UUFDdkYsTUFBTSx1QkFBdUIsR0FBVyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsR0FBRywyQkFBVSxDQUFDLGtCQUFrQixDQUFDO0lBQ3hFLENBQUM7SUFDRCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWM7UUFDakMsTUFBTSxJQUFJLEdBQVUsTUFBTSxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRixNQUFNLFNBQVMsR0FBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQWUsQ0FBQztRQUN2RixNQUFNLHVCQUF1QixHQUFXLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDaEUsT0FBTyxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxHQUFHLDJCQUFVLENBQUMsa0JBQWtCLENBQUM7SUFDeEUsQ0FBQztJQUNELEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBYztRQUNoQyxNQUFNLElBQUksR0FBVSxNQUFNLG9CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sU0FBUyxHQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBZSxDQUFDO1FBQ3ZGLE1BQU0sc0JBQXNCLEdBQVcsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUU5RCxPQUFPLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxDQUFDLEdBQUcsMkJBQVUsQ0FBQyxrQkFBa0IsQ0FBQztJQUN2RSxDQUFDO0lBQ0QsS0FBSyxDQUFDLFdBQVc7UUFDaEIsT0FBTywyQkFBVSxDQUFDLGtCQUFrQixDQUFDO0lBQ3RDLENBQUM7SUFDRCxpREFBaUQ7SUFDakQsbUNBQW1DO0lBQ25DLEtBQUs7SUFDTCxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQXFCO1FBQzFDLE9BQU8sTUFBTSwwQkFBUyxDQUFDLGdCQUFnQixDQUN0QyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQ3hCO1lBQ0MsSUFBSSxFQUFFLFNBQVM7U0FDZixFQUNELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNoQixDQUFDO0lBQ0gsQ0FBQztJQUNELEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBcUI7UUFDMUMsT0FBTyxNQUFNLDBCQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUN4RCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDRixDQUFDO0lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ3pELElBQUk7WUFDSCxNQUFNLE1BQU0sR0FBZSxNQUFNLDBCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDRixDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzNELElBQUk7WUFDSCxNQUFNLFlBQVksR0FBZSxNQUFNLElBQUksMEJBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEUsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNsRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNGLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDM0QsSUFBSTtZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sMEJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdHLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0YsQ0FBQztJQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUMzRCxJQUFJO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNGLENBQUM7Q0FDRCxDQUFDO0FBRUYsa0JBQWUsbUJBQW1CLENBQUMifQ==
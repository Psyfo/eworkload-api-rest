"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_model_1 = __importDefault(require("./module.model"));
const logger_config_1 = require("../../config/logger.config");
class UtilityController {
    static async resetModuleDepartments(departmentId) {
        const modules = await module_model_1.default.find({ departmentId: departmentId });
        const restModules = await modules.map((module) => {
            return module_model_1.default.findOneAndUpdate({ _id: module.id }, {
                $set: {
                    lecturedBy: departmentId
                }
            });
        });
        logger_config_1.logger.info(restModules);
        return `Modules for department ${departmentId} reset`;
    }
}
exports.default = UtilityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kdWxlL3V0aWxpdHkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtFQUFvQztBQUVwQyw4REFBb0Q7QUFJcEQsTUFBcUIsaUJBQWlCO0lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsWUFBb0I7UUFDN0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxzQkFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQWUsRUFBRSxFQUFFO1lBQ3hELE9BQU8sc0JBQU0sQ0FBQyxnQkFBZ0IsQ0FDNUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNsQjtnQkFDRSxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLFlBQVk7aUJBQ3pCO2FBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxzQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixPQUFPLDBCQUEwQixZQUFZLFFBQVEsQ0FBQztJQUN4RCxDQUFDO0NBQ0Y7QUFoQkQsb0NBZ0JDIn0=
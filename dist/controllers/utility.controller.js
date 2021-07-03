"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_model_1 = __importDefault(require("./../models/module.model"));
const logger_config_1 = require("./../config/logger.config");
class UtilityController {
    static resetModuleDepartments(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = yield module_model_1.default.find({ departmentId: departmentId });
            const restModules = yield modules.map((module) => {
                return module_model_1.default.findOneAndUpdate({ _id: module.id }, {
                    $set: {
                        lecturedBy: departmentId
                    }
                });
            });
            logger_config_1.logger.info(restModules);
            return `Modules for department ${departmentId} reset`;
        });
    }
}
exports.default = UtilityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvdXRpbGl0eS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQThDO0FBRTlDLDZEQUFtRDtBQUluRCxNQUFxQixpQkFBaUI7SUFDN0IsTUFBTSxDQUFPLHNCQUFzQixDQUFDLFlBQW9COztZQUM3RCxNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDbEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBZSxFQUFFLEVBQUU7Z0JBQ3hELE9BQU8sc0JBQU0sQ0FBQyxnQkFBZ0IsQ0FDNUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNsQjtvQkFDRSxJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFLFlBQVk7cUJBQ3pCO2lCQUNGLENBQ0YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0gsc0JBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTywwQkFBMEIsWUFBWSxRQUFRLENBQUM7UUFDeEQsQ0FBQztLQUFBO0NBQ0Y7QUFoQkQsb0NBZ0JDIn0=
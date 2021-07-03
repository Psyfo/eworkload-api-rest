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
const parameters_config_1 = __importDefault(require("./../config/parameters.config"));
const user_controller_1 = __importDefault(require("./../controllers/user.controller"));
const user_model_1 = __importDefault(require("./../models/user.model"));
const work_focus_model_1 = __importDefault(require("./../models/work-focus.model"));
class WorkFocusController {
    static workFocus(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield work_focus_model_1.default.findOne({ name: name });
        });
    }
    static workFocuses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield work_focus_model_1.default.find({});
        });
    }
    static teachingHours(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_model_1.default.findOne({ userId: userId }).populate('work-focus'));
            const workFocus = (yield this.workFocus(user.workFocusName));
            const teachingFocusPercentage = workFocus.teachingRatio;
            return (teachingFocusPercentage / 100) * parameters_config_1.default.annual_total_hours;
        });
    }
    static researchHours(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_model_1.default.findOne({ userId: userId }).populate('work-focus'));
            const workFocus = (yield this.workFocus(user.workFocusName));
            const researchFocusPercentage = workFocus.researchRatio;
            return (researchFocusPercentage / 100) * parameters_config_1.default.annual_total_hours;
        });
    }
    static serviceHours(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_controller_1.default.user(userId));
            const workFocus = (yield this.workFocus(user.workFocusName));
            const serviceFocusPercentage = workFocus.serviceRatio;
            return (serviceFocusPercentage / 100) * parameters_config_1.default.annual_total_hours;
        });
    }
    static annualHours() {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters_config_1.default.annual_total_hours;
        });
    }
    static createWorkFocus(workFocus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield workFocus.save();
        });
    }
    static updateWorkFocus(workFocus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield work_focus_model_1.default.findOneAndUpdate({ name: workFocus.name }, {
                $set: workFocus
            }, { upsert: true });
        });
    }
    static deleteWorkFocus(workFocus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield work_focus_model_1.default.findOneAndRemove({ _id: workFocus.id });
        });
    }
}
exports.default = WorkFocusController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mb2N1cy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvd29yay1mb2N1cy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBSUEsc0ZBQXVEO0FBQ3ZELHVGQUE4RDtBQUM5RCx3RUFBMEM7QUFDMUMsb0ZBQXFEO0FBRXJELE1BQXFCLG1CQUFtQjtJQUMvQixNQUFNLENBQU8sU0FBUyxDQUFDLElBQVk7O1lBQ3hDLE9BQU8sTUFBTSwwQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXOztZQUM3QixPQUFPLE1BQU0sMEJBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGFBQWEsQ0FBQyxNQUFjOztZQUM5QyxNQUFNLElBQUksR0FBVSxDQUFDLE1BQU0sb0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQ2xFLFlBQVksQ0FDYixDQUFVLENBQUM7WUFDWixNQUFNLFNBQVMsR0FBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FDakQsSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBZSxDQUFDO1lBQ2pCLE1BQU0sdUJBQXVCLEdBQVcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNoRSxPQUFPLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDLEdBQUcsMkJBQVUsQ0FBQyxrQkFBa0IsQ0FBQztRQUN6RSxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sYUFBYSxDQUFDLE1BQWM7O1lBQzlDLE1BQU0sSUFBSSxHQUFVLENBQUMsTUFBTSxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FDbEUsWUFBWSxDQUNiLENBQVUsQ0FBQztZQUNaLE1BQU0sU0FBUyxHQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUNqRCxJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFlLENBQUM7WUFDakIsTUFBTSx1QkFBdUIsR0FBVyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsR0FBRywyQkFBVSxDQUFDLGtCQUFrQixDQUFDO1FBQ3pFLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxZQUFZLENBQUMsTUFBYzs7WUFDN0MsTUFBTSxJQUFJLEdBQVUsQ0FBQyxNQUFNLHlCQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFVLENBQUM7WUFDakUsTUFBTSxTQUFTLEdBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQ2pELElBQUksQ0FBQyxhQUFhLENBQ25CLENBQWUsQ0FBQztZQUNqQixNQUFNLHNCQUFzQixHQUFXLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFFOUQsT0FBTyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxHQUFHLDJCQUFVLENBQUMsa0JBQWtCLENBQUM7UUFDeEUsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVc7O1lBQzdCLE9BQU8sMkJBQVUsQ0FBQyxrQkFBa0IsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sZUFBZSxDQUFDLFNBQXFCOztZQUN2RCxPQUFPLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxlQUFlLENBQUMsU0FBcUI7O1lBQ3ZELE9BQU8sTUFBTSwwQkFBUyxDQUFDLGdCQUFnQixDQUNyQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQ3hCO2dCQUNFLElBQUksRUFBRSxTQUFTO2FBQ2hCLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sZUFBZSxDQUFDLFNBQXFCOztZQUN2RCxPQUFPLE1BQU0sMEJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQUE7Q0FDRjtBQXRERCxzQ0FzREMifQ==
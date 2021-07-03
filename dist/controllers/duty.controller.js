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
const duty_model_1 = __importDefault(require("./../models/duty.model"));
class DutyController {
    static duty(dutyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield duty_model_1.default.findOne({ dutyId: dutyId });
        });
    }
    static duties() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield duty_model_1.default.find({});
        });
    }
    static createDuty(duty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new duty_model_1.default(duty).save();
        });
    }
    static updateDuty(duty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield duty_model_1.default.findOneAndUpdate({ dutyId: duty.dutyId }, {
                $set: duty,
            }, { upsert: true });
        });
    }
    static deleteDuty(duty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield duty_model_1.default.findOneAndRemove({ dutyId: duty.dutyId });
        });
    }
}
exports.default = DutyController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHV0eS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvZHV0eS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQTBDO0FBRzFDLE1BQXFCLGNBQWM7SUFDMUIsTUFBTSxDQUFPLElBQUksQ0FBQyxNQUFjOztZQUNyQyxPQUFPLE1BQU0sb0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sTUFBTTs7WUFDeEIsT0FBTyxNQUFNLG9CQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsSUFBVzs7WUFDeEMsT0FBTyxNQUFNLElBQUksb0JBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sVUFBVSxDQUFDLElBQVc7O1lBQ3hDLE9BQU8sTUFBTSxvQkFBSSxDQUFDLGdCQUFnQixDQUNoQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQ3ZCO2dCQUNFLElBQUksRUFBRSxJQUFJO2FBQ1gsRUFDRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsSUFBVzs7WUFDeEMsT0FBTyxNQUFNLG9CQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztLQUFBO0NBQ0Y7QUF0QkQsaUNBc0JDIn0=
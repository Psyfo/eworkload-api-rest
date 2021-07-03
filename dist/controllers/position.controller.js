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
const position_model_1 = __importDefault(require("./../models/position.model"));
class PositionController {
    static position(positionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield position_model_1.default.findOne({ positionId: positionId });
        });
    }
    static positions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield position_model_1.default.find({});
        });
    }
    static createPosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new position_model_1.default(position).save();
        });
    }
    static updatePosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield position_model_1.default.findOneAndUpdate({ positionId: position.positionId }, {
                $set: position
            }, { upsert: true });
        });
    }
    static deletePosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield position_model_1.default.findOneAndRemove({ positionId: position.positionId });
        });
    }
}
exports.default = PositionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL3Bvc2l0aW9uLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSxnRkFBa0Q7QUFFbEQsTUFBcUIsa0JBQWtCO0lBQzlCLE1BQU0sQ0FBTyxRQUFRLENBQUMsVUFBa0I7O1lBQzdDLE9BQU8sTUFBTSx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxTQUFTOztZQUMzQixPQUFPLE1BQU0sd0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGNBQWMsQ0FBQyxRQUFtQjs7WUFDcEQsT0FBTyxNQUFNLElBQUksd0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sY0FBYyxDQUFDLFFBQW1COztZQUNwRCxPQUFPLE1BQU0sd0JBQVEsQ0FBQyxnQkFBZ0IsQ0FDcEMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUNuQztnQkFDRSxJQUFJLEVBQUUsUUFBUTthQUNmLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sY0FBYyxDQUFDLFFBQW1COztZQUNwRCxPQUFPLE1BQU0sd0JBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7Q0FDRjtBQXRCRCxxQ0FzQkMifQ==
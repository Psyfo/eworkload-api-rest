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
const offering_type_model_1 = __importDefault(require("./../models/offering-type.model"));
class OfferingTypeController {
    static offeringType(offeringTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield offering_type_model_1.default.findOne({ offeringTypeId: offeringTypeId });
        });
    }
    static offeringTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield offering_type_model_1.default.find({});
        });
    }
    static createOfferingType(offeringType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new offering_type_model_1.default(offeringType).save();
        });
    }
    static updateOfferingType(offeringType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield offering_type_model_1.default.findOneAndUpdate({ offeringTypeId: offeringType.offeringTypeId }, {
                $set: offeringType
            }, { upsert: true });
        });
    }
    static deleteOfferingType(offeringType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield offering_type_model_1.default.findOneAndRemove({ offeringTypeId: offeringType.offeringTypeId });
        });
    }
}
exports.default = OfferingTypeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXJpbmctdHlwZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvb2ZmZXJpbmctdHlwZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMEZBQTJEO0FBRTNELE1BQXFCLHNCQUFzQjtJQUNsQyxNQUFNLENBQU8sWUFBWSxDQUFDLGNBQXNCOztZQUNyRCxPQUFPLE1BQU0sNkJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sYUFBYTs7WUFDL0IsT0FBTyxNQUFNLDZCQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxrQkFBa0IsQ0FBQyxZQUEyQjs7WUFDaEUsT0FBTyxNQUFNLElBQUksNkJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sa0JBQWtCLENBQUMsWUFBMkI7O1lBQ2hFLE9BQU8sTUFBTSw2QkFBWSxDQUFDLGdCQUFnQixDQUN4QyxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQy9DO2dCQUNFLElBQUksRUFBRSxZQUFZO2FBQ25CLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sa0JBQWtCLENBQUMsWUFBMkI7O1lBQ2hFLE9BQU8sTUFBTSw2QkFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7S0FBQTtDQUNGO0FBdEJELHlDQXNCQyJ9
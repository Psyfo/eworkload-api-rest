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
const venue_model_1 = __importDefault(require("./../models/venue.model"));
class VenueController {
    static venue(venueId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield venue_model_1.default.findOne({ venueId: venueId });
        });
    }
    static venues() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield venue_model_1.default.find({});
        });
    }
    static createVenue(venue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield venue.save();
        });
    }
    static updateVenue(venue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield venue_model_1.default.findOneAndUpdate({ venueId: venue.venueId }, {
                venueId: venue.venueId,
                capacity: venue.capacity,
                campus: venue.campus,
                type: venue.type
            }, { upsert: true });
        });
    }
    static deleteVenue(venue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield venue_model_1.default.findOneAndRemove({ venueId: venue.venueId });
        });
    }
}
exports.default = VenueController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVudWUuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL3ZlbnVlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwRUFBNEM7QUFFNUMsTUFBcUIsZUFBZTtJQUMzQixNQUFNLENBQU8sS0FBSyxDQUFDLE9BQWU7O1lBQ3ZDLE9BQU8sTUFBTSxxQkFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxNQUFNOztZQUN4QixPQUFPLE1BQU0scUJBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxLQUFhOztZQUMzQyxPQUFPLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXLENBQUMsS0FBYTs7WUFDM0MsT0FBTyxNQUFNLHFCQUFLLENBQUMsZ0JBQWdCLENBQ2pDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFDMUI7Z0JBQ0UsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDcEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO2FBQ2pCLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sV0FBVyxDQUFDLEtBQWE7O1lBQzNDLE9BQU8sTUFBTSxxQkFBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7S0FBQTtDQUNGO0FBekJELGtDQXlCQyJ9
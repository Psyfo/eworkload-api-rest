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
const block_model_1 = __importDefault(require("./../models/block.model"));
class BlockController {
    constructor() { }
    static block(blockId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield block_model_1.default.findOne({ blockId: blockId });
        });
    }
    static blocks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield block_model_1.default.find({});
        });
    }
    static createBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new block_model_1.default(block).save();
        });
    }
    static updateBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield block_model_1.default.findOneAndUpdate({ blockId: block.blockId }, {
                $set: block
            }, { upsert: true });
        });
    }
    static deleteBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield block_model_1.default.findOneAndRemove({ blockId: block.blockId });
        });
    }
}
exports.default = BlockController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2Jsb2NrLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwRUFBNEM7QUFFNUMsTUFBcUIsZUFBZTtJQUNsQyxnQkFBZSxDQUFDO0lBRVQsTUFBTSxDQUFPLEtBQUssQ0FBQyxPQUFlOztZQUN2QyxPQUFPLE1BQU0scUJBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sTUFBTTs7WUFDeEIsT0FBTyxNQUFNLHFCQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXLENBQUMsS0FBYTs7WUFDM0MsT0FBTyxNQUFNLElBQUkscUJBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sV0FBVyxDQUFDLEtBQWE7O1lBQzNDLE9BQU8sTUFBTSxxQkFBSyxDQUFDLGdCQUFnQixDQUNqQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQzFCO2dCQUNFLElBQUksRUFBRSxLQUFLO2FBQ1osRUFDRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXLENBQUMsS0FBYTs7WUFDM0MsT0FBTyxNQUFNLHFCQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztLQUFBO0NBQ0Y7QUF4QkQsa0NBd0JDIn0=
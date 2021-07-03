"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workFocusSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true
    },
    teachingRatio: {
        type: Number
    },
    researchRatio: {
        type: Number
    },
    serviceRatio: {
        type: Number
    }
}, {
    timestamps: true
});
const WorkFocus = mongoose_1.default.model('WorkFocus', workFocusSchema);
exports.default = WorkFocus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mb2N1cy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy93b3JrLWZvY3VzLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQU0sZUFBZSxHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQ3pDO0lBQ0UsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsSUFBSTtLQUNiO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsTUFBTTtLQUNiO0NBQ0YsRUFDRDtJQUNFLFVBQVUsRUFBRSxJQUFJO0NBQ2pCLENBQ0YsQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUMvRCxrQkFBZSxTQUFTLENBQUMifQ==
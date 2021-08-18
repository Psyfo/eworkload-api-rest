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
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
const WorkFocus = mongoose_1.default.model('WorkFocus', workFocusSchema);
exports.default = WorkFocus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mb2N1cy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dvcmstZm9jdXMvd29yay1mb2N1cy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUN6QztJQUNFLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDYjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLE1BQU07S0FDYjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUMvRCxrQkFBZSxTQUFTLENBQUMifQ==
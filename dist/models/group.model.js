"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    groupId: {
        type: String,
        required: true,
        trim: true
    },
    moduleId: {
        type: String,
        ref: 'Module'
    },
    studentsEnrolled: {
        type: Number
    },
    modularity: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
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
// INDEXES
groupSchema.index({ moduleId: 1, groupId: 1 }, { unique: true });
// HOOKS
// VIRTUALS
groupSchema.virtual('module', {
    ref: 'Module',
    localField: 'moduleId',
    foreignField: '_id',
    justOne: true
});
const Group = mongoose_1.default.model('Group', groupSchema);
exports.default = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvZ3JvdXAubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDckM7SUFDRSxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLFFBQVE7S0FDZDtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFVBQVU7QUFDVixXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVqRSxRQUFRO0FBRVIsV0FBVztBQUNYLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0lBQzVCLEdBQUcsRUFBRSxRQUFRO0lBQ2IsVUFBVSxFQUFFLFVBQVU7SUFDdEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbkQsa0JBQWUsS0FBSyxDQUFDIn0=
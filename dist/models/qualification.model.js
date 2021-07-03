"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const qualificationSchema = new mongoose_1.default.Schema({
    qualificationId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    departmentId: {
        type: String,
        trim: true,
        ref: 'Department'
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
// Virtuals
qualificationSchema.virtual('department', {
    ref: 'Department',
    localField: 'departmentId',
    foreignField: 'departmentId',
    justOne: true
});
const Qualification = mongoose_1.default.model('Qualification', qualificationSchema);
exports.default = Qualification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbGlmaWNhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9xdWFsaWZpY2F0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDN0M7SUFDRSxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsWUFBWTtLQUNsQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0NBQ0YsRUFDRDtJQUNFLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FDRixDQUFDO0FBRUYsV0FBVztBQUNYLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7SUFDeEMsR0FBRyxFQUFFLFlBQVk7SUFDakIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsWUFBWSxFQUFFLGNBQWM7SUFDNUIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFFSCxNQUFNLGFBQWEsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUMzRSxrQkFBZSxhQUFhLENBQUMifQ==
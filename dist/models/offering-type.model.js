"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const offeringTypeSchema = new mongoose_1.default.Schema({
    offeringTypeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const OfferingType = mongoose_1.default.model('OfferingType', offeringTypeSchema);
exports.default = OfferingType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXJpbmctdHlwZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9vZmZlcmluZy10eXBlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBR2hDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDNUM7SUFDRSxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDYjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtLQUNiO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO0tBQ1g7Q0FDRixFQUNEO0lBQ0UsVUFBVSxFQUFFLElBQUk7Q0FDakIsQ0FDRixDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDeEUsa0JBQWUsWUFBWSxDQUFDIn0=
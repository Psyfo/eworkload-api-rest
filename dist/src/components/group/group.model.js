"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const groupSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    moduleIds: [
        {
            type: String,
            ref: 'Module'
        }
    ],
    studentsEnrolled: {
        type: Number
    },
    modularity: {
        type: Number,
        default: 1
    },
    coordinatorId: {
        type: String,
        ref: 'User'
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
// groupSchema.index({ moduleId: 1, groupId: 1 }, { unique: true });
// HOOKS
groupSchema.post('save', function (doc, next) {
    try {
        console.log();
    }
    catch (error) {
        config_1.logger.error(error);
        next(error);
    }
});
// VIRTUALS
groupSchema.virtual('modules', {
    ref: 'Module',
    localField: 'moduleIds',
    foreignField: '_id'
});
groupSchema.virtual('coordinator', {
    ref: 'User',
    localField: 'coordinatorId',
    foreignField: 'userId',
    justOne: true
});
const Group = mongoose_1.default.model('Group', groupSchema);
exports.default = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ncm91cC9ncm91cC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyx5Q0FBc0M7QUFHdEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDdEM7SUFDQyxJQUFJLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtLQUNaO0lBQ0QsU0FBUyxFQUFFO1FBQ1Y7WUFDQyxJQUFJLEVBQUUsTUFBTTtZQUNaLEdBQUcsRUFBRSxRQUFRO1NBQ2I7S0FDRDtJQUNELGdCQUFnQixFQUFFO1FBQ2pCLElBQUksRUFBRSxNQUFNO0tBQ1o7SUFDRCxVQUFVLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1Y7SUFDRCxhQUFhLEVBQUU7UUFDZCxJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxNQUFNO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVixJQUFJLEVBQUUsSUFBSTtLQUNWO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsSUFBSSxFQUFFLElBQUk7S0FDVjtDQUNELEVBQ0Q7SUFDQyxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDUCxRQUFRLEVBQUUsSUFBSTtLQUNkO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLElBQUk7S0FDZDtDQUNELENBQ0QsQ0FBQztBQUVGLFVBQVU7QUFDVixvRUFBb0U7QUFFcEUsUUFBUTtBQUVSLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUk7SUFDM0MsSUFBSTtRQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZixlQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNaO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxXQUFXO0FBQ1gsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7SUFDOUIsR0FBRyxFQUFFLFFBQVE7SUFDYixVQUFVLEVBQUUsV0FBVztJQUN2QixZQUFZLEVBQUUsS0FBSztDQUNuQixDQUFDLENBQUM7QUFDSCxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtJQUNsQyxHQUFHLEVBQUUsTUFBTTtJQUNYLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLE9BQU8sRUFBRSxJQUFJO0NBQ2IsQ0FBQyxDQUFDO0FBRUgsTUFBTSxLQUFLLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQVMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNELGtCQUFlLEtBQUssQ0FBQyJ9
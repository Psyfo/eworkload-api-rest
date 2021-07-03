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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_config_1 = require("./../../config/logger.config");
const communityInstructionWorkloadSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true
    },
    communityInstructionWorkloads: [
        {
            activity: {
                type: mongoose_1.default.Schema.Types.Mixed
            },
            totalHoursPerActivity: {
                type: Number,
                default: 0
            },
            percentageOfWorkFocusPerActivity: {
                type: Number,
                default: 0
            },
            percentageOfAnnualHoursPerActivity: {
                type: Number,
                default: 0
            },
            percentageOfTotalHoursPerActivity: {
                type: Number,
                default: 0
            }
        }
    ],
    globalTarrif: {
        type: Number,
        default: 0
    },
    totalHoursPerUser: {
        type: Number,
        default: 0
    },
    percentageOfWorkFocusPerUser: {
        type: Number,
        default: 0
    },
    percentageOfAnnualHoursPerUser: {
        type: Number,
        default: 0
    },
    percentageOfTotalHoursPerUser: {
        type: Number,
        default: 0
    }
});
// HOOKS
communityInstructionWorkloadSchema.post('save', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_config_1.logger.info('Community Instruction Workload created');
    });
});
// INDEX
communityInstructionWorkloadSchema.index({ userId: 1 }, { unique: true });
// VIRTUALS
communityInstructionWorkloadSchema.virtual('community-instruction-activity', {
    ref: 'CommunityInstructionActivity',
    localField: 'activityId',
    foreignField: 'activityId',
    justOne: true
});
const CommunityInstructionWorkload = mongoose_1.default.model('CommunityInstructionWorkload', communityInstructionWorkloadSchema);
exports.default = CommunityInstructionWorkload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LWluc3RydWN0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbW9kZWxzL3dvcmtsb2FkL2NvbW11bml0eS1pbnN0cnVjdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxnRUFBc0Q7QUFDdEQsTUFBTSxrQ0FBa0MsR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQzdELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDYjtJQUNELDZCQUE2QixFQUFFO1FBQzdCO1lBQ0UsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSzthQUNsQztZQUNELHFCQUFxQixFQUFFO2dCQUNyQixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBQ0QsZ0NBQWdDLEVBQUU7Z0JBQ2hDLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxrQ0FBa0MsRUFBRTtnQkFDbEMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELGlDQUFpQyxFQUFFO2dCQUNqQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7S0FDRjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELDRCQUE0QixFQUFFO1FBQzVCLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELDhCQUE4QixFQUFFO1FBQzlCLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELDZCQUE2QixFQUFFO1FBQzdCLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDWDtDQUNGLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUixrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQWUsR0FBUTs7UUFDckUsc0JBQU0sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBRUgsUUFBUTtBQUNSLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRTFFLFdBQVc7QUFDWCxrQ0FBa0MsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLEVBQUU7SUFDM0UsR0FBRyxFQUFFLDhCQUE4QjtJQUNuQyxVQUFVLEVBQUUsWUFBWTtJQUN4QixZQUFZLEVBQUUsWUFBWTtJQUMxQixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0sNEJBQTRCLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQ2pELDhCQUE4QixFQUM5QixrQ0FBa0MsQ0FDbkMsQ0FBQztBQUNGLGtCQUFlLDRCQUE0QixDQUFDIn0=
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
const formalInstructionWorkloadSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true
    },
    formalInstructionWorkloads: [
        {
            activity: {
                type: mongoose_1.default.Schema.Types
            },
            module: {
                type: mongoose_1.default.Schema.Types
            },
            block: {
                type: mongoose_1.default.Schema.Types
            },
            offeringType: {
                type: mongoose_1.default.Schema.Types
            },
            qualification: {
                type: mongoose_1.default.Schema.Types
            },
            studentsEnrolled: {
                type: Number,
                default: 0
            },
            baseContactHours: {
                type: Number,
                default: 0
            },
            coordinationHours: {
                type: Number,
                default: 0
            },
            studentSupportHours: {
                type: Number,
                default: 0
            },
            preparationTimeHours: {
                type: Number,
                default: 0
            },
            assessmentSettingsHours: {
                type: Number,
                default: 0
            },
            examMarkingHours: {
                type: Number,
                default: 0
            },
            courseworkMarkingHours: {
                type: Number,
                default: 0
            },
            feedbackHours: {
                type: Number,
                default: 0
            },
            formativeAssessmentHours: {
                type: Number,
                default: 0
            },
            moderationHours: {
                type: Number,
                default: 0
            },
            otherHoursPerActivity: {
                type: Number,
                default: 0
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
formalInstructionWorkloadSchema.post('save', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_config_1.logger.info('Formal Instruction Workload created');
    });
});
// INDEX
formalInstructionWorkloadSchema.index({ userId: 1 }, { unique: true });
// VIRTUALS
formalInstructionWorkloadSchema.virtual('formal-instruction-activity', {
    ref: 'FormalInstructionActivity',
    localField: 'activityId',
    foreignField: 'activityId',
    justOne: true
});
const FormalInstructionWorkload = mongoose_1.default.model('FormalInstructionWorkload', formalInstructionWorkloadSchema);
exports.default = FormalInstructionWorkload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbW9kZWxzL3dvcmtsb2FkL2Zvcm1hbC1pbnN0cnVjdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxnRUFBc0Q7QUFDdEQsTUFBTSwrQkFBK0IsR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQzFELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDYjtJQUNELDBCQUEwQixFQUFFO1FBQzFCO1lBQ0UsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQzVCO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQzVCO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQzVCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQzVCO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQzVCO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELGlCQUFpQixFQUFFO2dCQUNqQixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ25CLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxDQUFDO2FB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
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
const academicAdministrationWorkloadSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true
    },
    academicAdministrationWorkloads: [
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
academicAdministrationWorkloadSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_config_1.logger.info("Academic Administration Workload created");
    });
});
// INDEX
academicAdministrationWorkloadSchema.index({ userId: 1 }, { unique: true });
// VIRTUALS
academicAdministrationWorkloadSchema.virtual("academic-administration-activity", {
    ref: "AcademicAdministrationActivity",
    localField: "activityId",
    foreignField: "activityId",
    justOne: true
});
const AcademicAdministrationWorkload = mongoose_1.default.model("AcademicAdministrationWorkload", academicAdministrationWorkloadSchema);
exports.default = AcademicAdministrationWorkload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24ubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvd29ya2xvYWQvYWNhZGVtaWMtYWRtaW5pc3RyYXRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsZ0VBQW1EO0FBQ25ELE1BQU0sb0NBQW9DLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUMvRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ2I7SUFDRCwrQkFBK0IsRUFBRTtRQUMvQjtZQUNFLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFDbEM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELGdDQUFnQyxFQUFFO2dCQUNoQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBQ0Qsa0NBQWtDLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxpQ0FBaUMsRUFBRTtnQkFDakMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWDtTQUNGO0tBQ0Y7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCw0QkFBNEIsRUFBRTtRQUM1QixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCw4QkFBOEIsRUFBRTtRQUM5QixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCw2QkFBNkIsRUFBRTtRQUM3QixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7Q0FDRixDQUFDLENBQUM7QUFFSCxRQUFRO0FBQ1Isb0NBQW9DLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFlLEdBQVE7O1FBQ3ZFLHNCQUFNLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUVILFFBQVE7QUFDUixvQ0FBb0MsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUU1RSxXQUFXO0FBQ1gsb0NBQW9DLENBQUMsT0FBTyxDQUMxQyxrQ0FBa0MsRUFDbEM7SUFDRSxHQUFHLEVBQUUsZ0NBQWdDO0lBQ3JDLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLFlBQVksRUFBRSxZQUFZO0lBQzFCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FDRixDQUFDO0FBRUYsTUFBTSw4QkFBOEIsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FDbkQsZ0NBQWdDLEVBQ2hDLG9DQUFvQyxDQUNyQyxDQUFDO0FBQ0Ysa0JBQWUsOEJBQThCLENBQUMifQ==
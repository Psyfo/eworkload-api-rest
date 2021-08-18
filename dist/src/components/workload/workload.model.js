"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workloadSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    year: {
        type: String,
        default: new Date().getFullYear()
    },
    workFocusName: {
        type: String,
        ref: 'WorkFocus'
    },
    academicAdministrationWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    communityInstructionWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    executiveManagementWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    formalInstructionWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    personnelDevelopmentWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    publicServiceWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    researchWorkload: {
        type: mongoose_1.Schema.Types.Mixed
    },
    supervisionWorkload: {
        type: mongoose_1.Schema.Types.Mixed
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
// INDEX
workloadSchema.index({ userId: 1, year: 1 }, { unique: true });
// VIRTUALS
workloadSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true
});
workloadSchema.virtual('work-focus', {
    ref: 'WorkFocus',
    localField: 'workFocusName',
    foreignField: 'workFocusName',
    justOne: true
});
const Workload = mongoose_1.model('Workload', workloadSchema);
exports.default = Workload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2xvYWQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy93b3JrbG9hZC93b3JrbG9hZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUV6QyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFNLENBQy9CO0lBQ0UsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsTUFBTTtLQUNaO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7S0FDbEM7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxXQUFXO0tBQ2pCO0lBQ0QsOEJBQThCLEVBQUU7UUFDOUIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDekI7SUFDRCw0QkFBNEIsRUFBRTtRQUM1QixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztLQUN6QjtJQUNELDJCQUEyQixFQUFFO1FBQzNCLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO0tBQ3pCO0lBQ0QseUJBQXlCLEVBQUU7UUFDekIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDekI7SUFDRCw0QkFBNEIsRUFBRTtRQUM1QixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztLQUN6QjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO0tBQ3pCO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDekI7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztLQUN6QjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFFBQVE7QUFDUixjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUUvRCxXQUFXO0FBQ1gsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7SUFDN0IsR0FBRyxFQUFFLE1BQU07SUFDWCxVQUFVLEVBQUUsUUFBUTtJQUNwQixZQUFZLEVBQUUsUUFBUTtJQUN0QixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUNILGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO0lBQ25DLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFlBQVksRUFBRSxlQUFlO0lBQzdCLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsTUFBTSxRQUFRLEdBQUcsZ0JBQUssQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDbkQsa0JBQWUsUUFBUSxDQUFDIn0=
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2xvYWQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2RlbHMvd29ya2xvYWQvd29ya2xvYWQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFFekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBTSxDQUMvQjtJQUNFLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLE1BQU07S0FDWjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO0tBQ2xDO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsV0FBVztLQUNqQjtJQUNELDhCQUE4QixFQUFFO1FBQzlCLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO0tBQ3pCO0lBQ0QsNEJBQTRCLEVBQUU7UUFDNUIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDekI7SUFDRCwyQkFBMkIsRUFBRTtRQUMzQixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztLQUN6QjtJQUNELHlCQUF5QixFQUFFO1FBQ3pCLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO0tBQ3pCO0lBQ0QsNEJBQTRCLEVBQUU7UUFDNUIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDekI7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztLQUN6QjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO0tBQ3pCO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDekI7Q0FDRixFQUNEO0lBQ0UsVUFBVSxFQUFFLElBQUk7SUFDaEIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUNGLENBQUM7QUFFRixRQUFRO0FBQ1IsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFFL0QsV0FBVztBQUNYLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO0lBQzdCLEdBQUcsRUFBRSxNQUFNO0lBQ1gsVUFBVSxFQUFFLFFBQVE7SUFDcEIsWUFBWSxFQUFFLFFBQVE7SUFDdEIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFDSCxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtJQUNuQyxHQUFHLEVBQUUsV0FBVztJQUNoQixVQUFVLEVBQUUsZUFBZTtJQUMzQixZQUFZLEVBQUUsZUFBZTtJQUM3QixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQUVILE1BQU0sUUFBUSxHQUFHLGdCQUFLLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ25ELGtCQUFlLFFBQVEsQ0FBQyJ9
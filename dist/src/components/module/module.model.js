"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moduleSchema = new mongoose_1.default.Schema({
    moduleId: {
        type: String,
        trim: true
    },
    year: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    assessmentMethod: {
        type: String,
        trim: true
    },
    nqfLevel: {
        type: String,
        trim: true
    },
    qualificationId: {
        type: String,
        trim: true,
        ref: 'Qualification'
    },
    offeringTypeId: {
        type: String,
        trim: true,
        ref: 'OfferingType'
    },
    disciplineId: {
        type: String,
        trim: true,
        ref: 'Discipline'
    },
    venueId: {
        type: String,
        ref: 'Venue'
    },
    blockId: {
        type: String,
        unique: false,
        ref: 'Block'
    },
    credits: {
        type: Number
    },
    stackId: {
        type: String
    },
    studyPeriod: {
        type: String
    },
    lecturedBy: {
        type: String,
        ref: 'Department'
    },
    enrolled: {
        type: Number
    },
    studentsEnrolled: {
        type: Number
    },
    studentsExpected: {
        type: Number
    },
    moderation: {
        type: String
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
// INDEX
moduleSchema.index({ moduleId: 1, year: 1, qualificationId: 1 }, { unique: true });
// HOOKS
// VIRTUALS
moduleSchema.virtual('discipline', {
    ref: 'Discipline',
    localField: 'disciplineId',
    foreignField: 'disciplineId',
    justOne: true
});
moduleSchema.virtual('offeringType', {
    ref: 'OfferingType',
    localField: 'offeringTypeId',
    foreignField: 'offeringTypeId',
    justOne: true
});
moduleSchema.virtual('qualification', {
    ref: 'Qualification',
    localField: 'qualificationId',
    foreignField: 'qualificationId',
    justOne: true
});
moduleSchema.virtual('venue', {
    ref: 'Venue',
    localField: 'venueId',
    foreignField: 'venueId',
    justOne: true
});
moduleSchema.virtual('block', {
    ref: 'Block',
    localField: 'blockId',
    foreignField: 'blockId',
    justOne: true
});
moduleSchema.virtual('lectured-by', {
    ref: 'Department',
    localField: 'lecturedBy',
    foreignField: 'departmentId',
    justOne: true
});
moduleSchema.virtual('moderator', {
    ref: 'User',
    localField: 'moderatorId',
    foreignField: 'userId',
    justOne: true
});
const Module = mongoose_1.default.model('Module', moduleSchema);
exports.default = Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kdWxlL21vZHVsZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUdoQyxNQUFNLFlBQVksR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUN0QztJQUNFLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsZUFBZTtLQUNyQjtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsY0FBYztLQUNwQjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsWUFBWTtLQUNsQjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLE9BQU87S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFB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
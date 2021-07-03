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
const group_controller_1 = __importDefault(require("./../controllers/group.controller"));
const moduleSchema = new mongoose_1.default.Schema({
    moduleId: {
        type: String,
        unique: false,
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
        unique: false,
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
moduleSchema.index({ moduleId: 1, blockId: 1, offeringTypeId: 1, qualificationId: 1 }, { unique: true });
// HOOKS
// Add group by default
moduleSchema.post('save', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const module = doc;
        const newGroup = {
            groupId: 'A',
            moduleId: module.id,
            studentsEnrolled: module.studentsEnrolled,
            modularity: 1
        };
        // create default group
        yield group_controller_1.default.createGroup(newGroup);
    });
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL21vZHVsZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFnQztBQUVoQyx5RkFBZ0U7QUFHaEUsTUFBTSxZQUFZLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDdEM7SUFDRSxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsZUFBZTtLQUNyQjtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxjQUFjO0tBQ3BCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxZQUFZO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsT0FBTztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVB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
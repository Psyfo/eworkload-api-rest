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
const workload_controller_1 = __importDefault(require("../../controllers/workload/workload.controller"));
const activity_model_1 = __importDefault(require("./activity.model"));
const formalInstructionActivitySchema = new mongoose_1.default.Schema({
    groupId: {
        type: String,
        required: true,
        ref: 'Group'
    },
    isCoordinator: {
        type: Boolean
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
// HOOKS
formalInstructionActivitySchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = yield this;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
formalInstructionActivitySchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
formalInstructionActivitySchema.post('findOneAndRemove', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = doc;
        yield workload_controller_1.default.calculateTotalWorkload(activity.userId);
    });
});
// VIRTUALS
formalInstructionActivitySchema.virtual('group', {
    ref: 'Group',
    localField: 'groupId',
    foreignField: '_id',
    justOne: true
});
const FormalInstructionActivity = activity_model_1.default.discriminator('FormalInstructionActivity', formalInstructionActivitySchema);
exports.default = FormalInstructionActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLWFjdGl2aXR5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbW9kZWxzL2FjdGl2aXR5L2Zvcm1hbC1pbnN0cnVjdGlvbi1hY3Rpdml0eS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUVoQyx5R0FBZ0Y7QUFDaEYsc0VBQXdDO0FBRXhDLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FDekQ7SUFDRSxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLE9BQU87S0FDYjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxPQUFPO0tBQ2Q7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7S0FDWDtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQ0YsQ0FBQztBQUVGLFFBQVE7QUFFUixRQUFRO0FBQ1IsK0JBQStCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTs7UUFDM0MsTUFBTSxRQUFRLEdBQVEsTUFBTSxJQUFJLENBQUM7UUFDakMsTUFBTSw2QkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBLENBQUMsQ0FBQztBQUNILCtCQUErQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFlLEdBQUc7O1FBQ3pFLE1BQU0sUUFBUSxHQUFRLEdBQUcsQ0FBQztRQUMxQixNQUFNLDZCQUFrQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyxDQUFDO0FBQ0gsK0JBQStCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQWUsR0FBRzs7UUFDekUsTUFBTSxRQUFRLEdBQVEsR0FBRyxDQUFDO1FBQzFCLE1BQU0sNkJBQWtCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FBQSxDQUFDLENBQUM7QUFFSCxXQUFXO0FBQ1gsK0JBQStCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtJQUMvQyxHQUFHLEVBQUUsT0FBTztJQUNaLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLFlBQVksRUFBRSxLQUFLO0lBQ25CLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsTUFBTSx5QkFBeUIsR0FBRyx3QkFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0FBQ3ZILGtCQUFlLHlCQUF5QixDQUFDIn0=
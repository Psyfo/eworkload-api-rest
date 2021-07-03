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
const group_model_1 = __importDefault(require("./../models/group.model"));
const module_controller_1 = __importDefault(require("./module.controller"));
class GroupController {
    static group(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.findOne({ _id: id }).populate('module');
        });
    }
    static groups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.find({}).populate('module');
        });
    }
    static groupsByModule(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.find({ moduleId: moduleId }).populate('module');
        });
    }
    static groupTotal(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = (yield this.groupsByModule(moduleId));
            let total = 0;
            for (let group of groups) {
                total += group.studentsEnrolled;
            }
            return total;
        });
    }
    static remainingStudents(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = (yield module_controller_1.default.module(moduleId));
            const groupTotal = yield this.groupTotal(moduleId);
            const remaining = module.studentsEnrolled - groupTotal;
            return remaining;
        });
    }
    static groupExists(groupId, moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield group_model_1.default.count({ groupId: groupId, moduleId: moduleId });
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }
    static createGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new group_model_1.default(group).save();
        });
    }
    static updateGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.findOneAndUpdate({
                _id: group.id
            }, {
                $set: {
                    group
                }
            }, { upsert: true });
        });
    }
    static deleteGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield group_model_1.default.findOneAndRemove({ _id: group.id });
        });
    }
}
exports.default = GroupController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2dyb3VwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSwwRUFBNEM7QUFDNUMsNEVBQW1EO0FBR25ELE1BQXFCLGVBQWU7SUFDM0IsTUFBTSxDQUFPLEtBQUssQ0FBQyxFQUFVOztZQUNsQyxPQUFPLE1BQU0scUJBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLE1BQU07O1lBQ3hCLE9BQU8sTUFBTSxxQkFBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGNBQWMsQ0FBQyxRQUFnQjs7WUFDakQsT0FBTyxNQUFNLHFCQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxVQUFVLENBQUMsUUFBZ0I7O1lBQzdDLE1BQU0sTUFBTSxHQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFhLENBQUM7WUFDM0UsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQ3hCLEtBQUssSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDakM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxpQkFBaUIsQ0FBQyxRQUFnQjs7WUFDcEQsTUFBTSxNQUFNLEdBQVksQ0FBQyxNQUFNLDJCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBWSxDQUFDO1lBQzdFLE1BQU0sVUFBVSxHQUFXLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRCxNQUFNLFNBQVMsR0FBVyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO1lBQy9ELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXLENBQUMsT0FBZSxFQUFFLFFBQWdCOztZQUMvRCxNQUFNLEtBQUssR0FBRyxNQUFNLHFCQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxRSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxLQUFhOztZQUMzQyxPQUFPLE1BQU0sSUFBSSxxQkFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxXQUFXLENBQUMsS0FBYTs7WUFDM0MsT0FBTyxNQUFNLHFCQUFLLENBQUMsZ0JBQWdCLENBQ2pDO2dCQUNFLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTthQUNkLEVBQ0Q7Z0JBQ0UsSUFBSSxFQUFFO29CQUNKLEtBQUs7aUJBQ047YUFDRixFQUNELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNqQixDQUFDO1FBQ0osQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxLQUFhOztZQUMzQyxPQUFPLE1BQU0scUJBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQUE7Q0FDRjtBQWxERCxrQ0FrREMifQ==
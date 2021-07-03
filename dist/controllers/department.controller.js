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
const department_model_1 = __importDefault(require("./../models/department.model"));
class DepartmentController {
    constructor() { }
    static department(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield department_model_1.default.findOne({ departmentId: departmentId })
                .populate('faculty')
                .populate('hod');
        });
    }
    static departments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield department_model_1.default.find({}).populate('faculty');
        });
    }
    static createDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new department_model_1.default(department).save();
        });
    }
    static updateDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield department_model_1.default.findOneAndUpdate({ departmentId: department.departmentId }, {
                $set: department
            }, { upsert: true }).populate('faculty');
        });
    }
    static deleteDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield department_model_1.default.findOneAndRemove({ departmentId: department.departmentId }).populate('faculty');
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvZGVwYXJ0bWVudC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0ZBRXNDO0FBRXRDLE1BQXFCLG9CQUFvQjtJQUN2QyxnQkFBZSxDQUFDO0lBRWhCLE1BQU0sQ0FBTyxVQUFVLENBQUMsWUFBb0I7O1lBQzFDLE9BQU8sTUFBTSwwQkFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQztpQkFDakUsUUFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDbkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBTyxXQUFXOztZQUN0QixPQUFPLE1BQU0sMEJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBTyxnQkFBZ0IsQ0FBQyxVQUF1Qjs7WUFDbkQsT0FBTyxNQUFNLElBQUksMEJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sZ0JBQWdCLENBQUMsVUFBdUI7O1lBQ25ELE9BQU8sTUFBTSwwQkFBZSxDQUFDLGdCQUFnQixDQUMzQyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsWUFBWSxFQUFFLEVBQ3pDO2dCQUNFLElBQUksRUFBRSxVQUFVO2FBQ2pCLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBTyxnQkFBZ0IsQ0FBQyxVQUF1Qjs7WUFDbkQsT0FBTyxNQUFNLDBCQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsUUFBUSxDQUM3RixTQUFTLENBQ1YsQ0FBQztRQUNKLENBQUM7S0FBQTtDQUNGO0FBNUJELHVDQTRCQyJ9
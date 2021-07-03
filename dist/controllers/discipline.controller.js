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
const discipline_model_1 = __importDefault(require("./../models/discipline.model"));
class DisciplineController {
    constructor() { }
    static discipline(disciplineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discipline_model_1.default.findOne({ disciplineId: disciplineId });
        });
    }
    static disciplines() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discipline_model_1.default.find({});
        });
    }
    static createDiscipline(discipline) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new discipline_model_1.default(discipline).save();
        });
    }
    static updateDiscipline(discipline) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discipline_model_1.default.findOneAndUpdate({ disciplineId: discipline.disciplineId }, {
                $set: discipline
            }, { upsert: true });
        });
    }
    static deleteDiscipline(discipline) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discipline_model_1.default.findOneAndRemove({ disciplineId: discipline.disciplineId });
        });
    }
}
exports.default = DisciplineController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY2lwbGluZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvZGlzY2lwbGluZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0ZBQXNEO0FBRXRELE1BQXFCLG9CQUFvQjtJQUN2QyxnQkFBZSxDQUFDO0lBRVQsTUFBTSxDQUFPLFVBQVUsQ0FBQyxZQUFvQjs7WUFDakQsT0FBTyxNQUFNLDBCQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFdBQVc7O1lBQzdCLE9BQU8sTUFBTSwwQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sZ0JBQWdCLENBQUMsVUFBdUI7O1lBQzFELE9BQU8sTUFBTSxJQUFJLDBCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGdCQUFnQixDQUFDLFVBQXVCOztZQUMxRCxPQUFPLE1BQU0sMEJBQVUsQ0FBQyxnQkFBZ0IsQ0FDdEMsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBRSxFQUN6QztnQkFDRSxJQUFJLEVBQUUsVUFBVTthQUNqQixFQUNELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNqQixDQUFDO1FBQ0osQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLGdCQUFnQixDQUFDLFVBQXVCOztZQUMxRCxPQUFPLE1BQU0sMEJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUNwRixDQUFDO0tBQUE7Q0FDRjtBQXhCRCx1Q0F3QkMifQ==
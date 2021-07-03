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
const uuid_1 = require("uuid");
const group_controller_1 = __importDefault(require("../controllers/group.controller"));
const module_model_1 = __importDefault(require("../models/module.model"));
class ModuleController {
    static module(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.findOne({
                _id: id
            })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static modules() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.find({})
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static modulesByDiscipline(disciplineIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.find({ disciplineId: { $in: disciplineIds } })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static modulesByCoordinator(coordinatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.find({ coordinatorId: coordinatorId })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static modulesByDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.find({ departmentId: departmentId })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static modulesByStack(stackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.find({ stackId: stackId })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static createModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if module exists
            const exists = yield this.moduleExists(module);
            if (exists === true) {
                throw new Error('This Module already exists');
            }
            // Add to DB
            return yield new module_model_1.default(module).save();
        });
    }
    static createModules(modules) {
        return __awaiter(this, void 0, void 0, function* () {
            let newModules = [];
            modules.forEach(module => {
                const newModule = new module_model_1.default(module);
                newModules.push(newModule);
            });
            let result = yield module_model_1.default.insertMany(newModules, { ordered: false });
            console.log('Bulk upload complete');
            return result;
        });
    }
    static updateModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.findOneAndUpdate({
                _id: module.id
            }, {
                $set: module
            }, { upsert: true })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static deleteModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.findOneAndRemove({ _id: module.id })
                .populate('discipline')
                .populate({
                path: 'qualification',
                model: 'Qualification',
                populate: {
                    path: 'department',
                    model: 'Department',
                    populate: {
                        path: 'faculty',
                        model: 'Faculty'
                    }
                }
            })
                .populate('offeringType')
                .populate('block')
                .populate('venue')
                .populate('lectured-by');
        });
    }
    static stackModules(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const stackId = uuid_1.v4();
            const updatedModules = ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                return yield module_model_1.default.findOneAndUpdate({
                    _Id: id
                }, {
                    $set: {
                        stackId: stackId
                    }
                }, { upsert: true });
            }));
            if (updatedModules === null) {
                throw new Error('No updated modules returned');
            }
            return updatedModules;
        });
    }
    static addModuleToStack(id, stackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    stackId: stackId
                }
            }, { upsert: true });
        });
    }
    static stackedWith(id, stackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.find({ _id: { $ne: id }, stackId: stackId });
        });
    }
    static unstackedModules() {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = (yield this.modules());
            let unstackedModules = [];
            for (let module of modules) {
                const count = yield module_model_1.default.countDocuments({ stackId: module.stackId });
                if (count > 0) {
                    unstackedModules.push(module);
                }
            }
            return unstackedModules;
        });
    }
    static unstackModule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield module_model_1.default.findOneAndUpdate({ _id: id }, { $set: { stackId: uuid_1.v4 } }, { upsert: true });
        });
    }
    static defaultGroupsAllModules() {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = (yield this.modules());
            yield modules.map((module) => __awaiter(this, void 0, void 0, function* () {
                // Check for group
                const group = yield group_controller_1.default.groupsByModule(module.id);
                console.log('Group?: ', group);
                if (!group.length) {
                    // Add default if not group
                    const newGroup = {
                        groupId: 'A',
                        moduleId: module.id,
                        studentsEnrolled: module.studentsEnrolled,
                        modularity: 1
                    };
                    // save group to db
                    yield group_controller_1.default.createGroup(newGroup);
                }
            }));
            return 'All modules assigned a group';
        });
    }
    static resetStacks() {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = (yield module_model_1.default.find().orFail());
            yield modules.map((module) => __awaiter(this, void 0, void 0, function* () {
                yield module_model_1.default.findOneAndUpdate({
                    _id: module.id
                }, {
                    $set: {
                        stackId: uuid_1.v4()
                    }
                }, { upsert: true });
            }));
            return 'All module stacks reset';
        });
    }
    static resetEnrollments() {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = (yield module_model_1.default.find().orFail());
            yield module_model_1.default.update({}, { $rename: { enrolled: 'studentsEnrolled' } }, { multi: true }, function (err, blocks) {
                if (err) {
                    throw err;
                }
                console.log('Module enrollments changed to studentsEnrolled');
            });
            return 'All module have been given enrollments';
        });
    }
    static moduleExists(module) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            let data = yield module_model_1.default.countDocuments({
                moduleId: module.moduleId,
                blockId: module.blockId,
                offeringTypeId: module.offeringTypeId,
                qualificationId: module.qualificationId
            });
            if (data !== 0) {
                result = true;
            }
            return result;
        });
    }
}
exports.default = ModuleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9tb2R1bGUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLCtCQUFvQztBQUVwQyx1RkFBOEQ7QUFDOUQsMEVBQTRDO0FBRTVDLE1BQXFCLGdCQUFnQjtJQUM1QixNQUFNLENBQU8sTUFBTSxDQUFDLEVBQVU7O1lBQ25DLE9BQU8sTUFBTSxzQkFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDMUIsR0FBRyxFQUFFLEVBQUU7YUFDUixDQUFDO2lCQUNDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQ3RCLFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsZUFBZTtnQkFDckIsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsU0FBUztxQkFDakI7aUJBQ0Y7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxjQUFjLENBQUM7aUJBQ3hCLFFBQVEsQ0FBQyxPQUFPLENBQUM7aUJBQ2pCLFFBQVEsQ0FBQyxPQUFPLENBQUM7aUJBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sT0FBTzs7WUFDekIsT0FBTyxNQUFNLHNCQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDekIsUUFBUSxDQUFDLFlBQVksQ0FBQztpQkFDdEIsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxlQUFlO2dCQUNyQixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxZQUFZO29CQUNsQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsUUFBUSxFQUFFO3dCQUNS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
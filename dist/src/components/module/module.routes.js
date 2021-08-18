"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const module_controller_1 = __importDefault(require("./module.controller"));
const router = express_1.default.Router();
router.get('/', module_controller_1.default.all);
router.get('/:_id', module_controller_1.default.byId);
router.get('/disciplineId/:disciplineId', module_controller_1.default.byDiscipline);
router.get('/coordinatorId/:coordinatorId', module_controller_1.default.byCoordinator);
router.get('/qualificationId/:qualificationId', module_controller_1.default.byQualification);
router.post('/', module_controller_1.default.create);
router.put('/', module_controller_1.default.update);
router.delete('/', module_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHVsZS9tb2R1bGUucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5Qiw0RUFBbUQ7QUFFbkQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwyQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwyQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLDJCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsMkJBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSwyQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSwyQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwyQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSwyQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU1QyxrQkFBZSxNQUFNLENBQUMifQ==
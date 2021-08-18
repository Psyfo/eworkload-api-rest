"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const department_controller_1 = __importDefault(require("./department.controller"));
const router = express_1.default.Router();
router.get('/', department_controller_1.default.all);
router.get('/:_id', department_controller_1.default.byId);
router.get('/departmentId/:departmentId', department_controller_1.default.byDepartmentId);
router.get('/facultyId/:facultyId', department_controller_1.default.byFacultyId);
router.post('/', department_controller_1.default.create);
router.put('/', department_controller_1.default.update);
router.delete('/', department_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kZXBhcnRtZW50L2RlcGFydG1lbnQucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QixvRkFBMkQ7QUFFM0QsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwrQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLCtCQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsK0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsK0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsK0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsK0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFaEQsa0JBQWUsTUFBTSxDQUFDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const discipline_controller_1 = __importDefault(require("./discipline.controller"));
const router = express_1.default.Router();
router.get('/', discipline_controller_1.default.all);
router.get('/:_id', discipline_controller_1.default.byId);
router.get('/disciplineId/:disciplineId', discipline_controller_1.default.byDisciplineId);
router.post('/', discipline_controller_1.default.create);
router.put('/', discipline_controller_1.default.update);
router.delete('/', discipline_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY2lwbGluZS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kaXNjaXBsaW5lL2Rpc2NpcGxpbmUucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QixvRkFBMkQ7QUFFM0QsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwrQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLCtCQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLCtCQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLCtCQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLCtCQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWhELGtCQUFlLE1BQU0sQ0FBQyJ9
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const enrollment_controller_1 = __importDefault(require("./enrollment.controller"));
const router = express_1.default.Router();
router.get('/', enrollment_controller_1.default.all);
router.get('/:_id', enrollment_controller_1.default.byId);
router.post('/', enrollment_controller_1.default.create);
router.put('/', enrollment_controller_1.default.update);
router.delete('/', enrollment_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsbWVudC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9lbnJvbGxtZW50L2Vucm9sbG1lbnQucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QixvRkFBMkQ7QUFFM0QsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwrQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwrQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSwrQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwrQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSwrQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoRCxrQkFBZSxNQUFNLENBQUMifQ==
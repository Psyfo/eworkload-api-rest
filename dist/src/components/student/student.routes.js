"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("./student.controller"));
const router = express_1.default.Router();
router.get('/', student_controller_1.default.all);
router.get('/:_id', student_controller_1.default.byId);
router.post('/', student_controller_1.default.create);
router.put('/', student_controller_1.default.update);
router.delete('/', student_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zdHVkZW50L3N0dWRlbnQucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5Qiw4RUFBcUQ7QUFFckQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSw0QkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSw0QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSw0QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSw0QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSw0QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QyxrQkFBZSxNQUFNLENBQUMifQ==
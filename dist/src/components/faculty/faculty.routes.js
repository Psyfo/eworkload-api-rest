"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const faculty_controller_1 = __importDefault(require("./faculty.controller"));
const router = express_1.Router();
router.get('/', faculty_controller_1.default.all);
router.get('/:_id', faculty_controller_1.default.byId);
router.post('/', faculty_controller_1.default.create);
router.put('/', faculty_controller_1.default.update);
router.delete('/', faculty_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdWx0eS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9mYWN1bHR5L2ZhY3VsdHkucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHFDQUFpQztBQUVqQyw4RUFBcUQ7QUFHckQsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDRCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDRCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLDRCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDRCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLDRCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdDLGtCQUFlLE1BQU0sQ0FBQyJ9
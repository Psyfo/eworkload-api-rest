"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const academic_administration_activity_controller_1 = __importDefault(require("./academic-administration-activity.controller"));
const router = express_1.default.Router();
router.get('/', academic_administration_activity_controller_1.default.all);
router.get('/:_id', academic_administration_activity_controller_1.default.byId);
router.get('/user/:userId', academic_administration_activity_controller_1.default.byUserId);
router.post('/', academic_administration_activity_controller_1.default.create);
router.put('/', academic_administration_activity_controller_1.default.update);
router.delete('/', academic_administration_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhZGVtaWMtYWRtaW5pdHJhdGlvbi1hY3Rpdml0eS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5L2FjYWRlbWljLWFkbWluaXN0cmF0aW9uL2FjYWRlbWljLWFkbWluaXRyYXRpb24tYWN0aXZpdHkucm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyREFBMkQ7QUFDM0Qsc0RBQThCO0FBRTlCLGdJQUFxRztBQUVyRyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHFEQUF3QyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHFEQUF3QyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLHFEQUF3QyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHFEQUF3QyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHFEQUF3QyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLHFEQUF3QyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXBFLGtCQUFlLE1BQU0sQ0FBQyJ9
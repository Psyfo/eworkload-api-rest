"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.default.Router();
router.get('/', user_controller_1.default.all);
router.get('/:_id', user_controller_1.default.byId);
router.get('/userId/:userId', user_controller_1.default.byUserId);
router.get('/position/:positionId', user_controller_1.default.byPosition);
router.post('/', user_controller_1.default.create);
router.put('/', user_controller_1.default.update);
router.delete('/', user_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdXNlci91c2Vycy5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyREFBMkQ7QUFDM0Qsc0RBQThCO0FBRTlCLHdFQUErQztBQUUvQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHlCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUseUJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLHlCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSx5QkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHlCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUseUJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTFDLGtCQUFlLE1BQU0sQ0FBQyJ9
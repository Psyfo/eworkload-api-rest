"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const executive_management_activity_controller_1 = __importDefault(require("./executive-management-activity.controller"));
const router = express_1.default.Router();
router.get('/', executive_management_activity_controller_1.default.all);
router.get('/:_id', executive_management_activity_controller_1.default.byId);
router.get('/user/:userId', executive_management_activity_controller_1.default.byUserId);
router.post('/', executive_management_activity_controller_1.default.create);
router.put('/', executive_management_activity_controller_1.default.update);
router.delete('/', executive_management_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0aXZlLW1hbmFnZW1lbnQtYWN0aXZpdHkucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9leGVjdXRpdmUtbWFuYWdlbWVudC9leGVjdXRpdmUtbWFuYWdlbWVudC1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsMEhBQStGO0FBRS9GLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsa0RBQXFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsa0RBQXFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsa0RBQXFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsa0RBQXFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsa0RBQXFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsa0RBQXFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFakUsa0JBQWUsTUFBTSxDQUFDIn0=
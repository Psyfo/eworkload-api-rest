"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const supervision_activity_controller_1 = __importDefault(require("./supervision-activity.controller"));
const router = express_1.default.Router();
router.get('/', supervision_activity_controller_1.default.all);
router.get('/:_id', supervision_activity_controller_1.default.byId);
router.get('/user/:userId', supervision_activity_controller_1.default.byUserId);
router.post('/', supervision_activity_controller_1.default.create);
router.put('/', supervision_activity_controller_1.default.update);
router.delete('/', supervision_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNpb24tYWN0aXZpdHkucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9zdXBlcnZpc2lvbi9zdXBlcnZpc2lvbi1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsd0dBQThFO0FBRTlFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUseUNBQTZCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUseUNBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUseUNBQTZCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUseUNBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUseUNBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUseUNBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFekQsa0JBQWUsTUFBTSxDQUFDIn0=
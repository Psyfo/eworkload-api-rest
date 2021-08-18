"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const research_activity_controller_1 = __importDefault(require("./research-activity.controller"));
const router = express_1.default.Router();
router.get('/', research_activity_controller_1.default.all);
router.get('/:_id', research_activity_controller_1.default.byId);
router.get('/user/:userId', research_activity_controller_1.default.byUserId);
router.post('/', research_activity_controller_1.default.create);
router.put('/', research_activity_controller_1.default.update);
router.delete('/', research_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZWFyY2gtYWN0aXZpdHkucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9yZXNlYXJjaC9yZXNlYXJjaC1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsa0dBQXdFO0FBRXhFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsc0NBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsc0NBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsc0NBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsc0NBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsc0NBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsc0NBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdEQsa0JBQWUsTUFBTSxDQUFDIn0=
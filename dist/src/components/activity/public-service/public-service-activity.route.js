"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const public_service_activity_controller_1 = __importDefault(require("./public-service-activity.controller"));
const router = express_1.default.Router();
router.get('/', public_service_activity_controller_1.default.all);
router.get('/:_id', public_service_activity_controller_1.default.byId);
router.get('/user/:userId', public_service_activity_controller_1.default.byUserId);
router.post('/', public_service_activity_controller_1.default.create);
router.put('/', public_service_activity_controller_1.default.update);
router.delete('/', public_service_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXNlcnZpY2UtYWN0aXZpdHkucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS9wdWJsaWMtc2VydmljZS9wdWJsaWMtc2VydmljZS1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsOEdBQW1GO0FBRW5GLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNENBQStCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNENBQStCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsNENBQStCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsNENBQStCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNENBQStCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsNENBQStCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0Qsa0JBQWUsTUFBTSxDQUFDIn0=
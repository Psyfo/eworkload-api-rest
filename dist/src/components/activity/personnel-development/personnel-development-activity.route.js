"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const personnel_development_activity_controller_1 = __importDefault(require("./personnel-development-activity.controller"));
const router = express_1.default.Router();
router.get('/', personnel_development_activity_controller_1.default.all);
router.get('/:_id', personnel_development_activity_controller_1.default.byId);
router.get('/user/:userId', personnel_development_activity_controller_1.default.byUserId);
router.post('/', personnel_development_activity_controller_1.default.create);
router.put('/', personnel_development_activity_controller_1.default.update);
router.delete('/', personnel_development_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ubmVsLWRldmVsb3BtZW50LWFjdGl2aXR5LnJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWN0aXZpdHkvcGVyc29ubmVsLWRldmVsb3BtZW50L3BlcnNvbm5lbC1kZXZlbG9wbWVudC1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsNEhBQWlHO0FBRWpHLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbURBQXNDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsbURBQXNDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEUsa0JBQWUsTUFBTSxDQUFDIn0=
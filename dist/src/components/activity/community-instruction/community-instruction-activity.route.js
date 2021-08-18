"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const community_instruction_activity_controller_1 = __importDefault(require("./community-instruction-activity.controller"));
const router = express_1.default.Router();
router.get('/', community_instruction_activity_controller_1.default.all);
router.get('/:_id', community_instruction_activity_controller_1.default.byId);
router.get('/user/:userId', community_instruction_activity_controller_1.default.byUserId);
router.post('/', community_instruction_activity_controller_1.default.create);
router.put('/', community_instruction_activity_controller_1.default.update);
router.delete('/', community_instruction_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LWluc3RydWN0aW9uLWFjdGl2aXR5LnJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWN0aXZpdHkvY29tbXVuaXR5LWluc3RydWN0aW9uL2NvbW11bml0eS1pbnN0cnVjdGlvbi1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsNEhBQWlHO0FBRWpHLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbURBQXNDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsbURBQXNDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsbURBQXNDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEUsa0JBQWUsTUFBTSxDQUFDIn0=
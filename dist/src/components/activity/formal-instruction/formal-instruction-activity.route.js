"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const formal_instruction_activity_controller_1 = __importDefault(require("./formal-instruction-activity.controller"));
const router = express_1.default.Router();
router.get('/', formal_instruction_activity_controller_1.default.all);
router.get('/:_id', formal_instruction_activity_controller_1.default.byId);
router.get('/user/:userId', formal_instruction_activity_controller_1.default.byUserId);
router.post('/', formal_instruction_activity_controller_1.default.create);
router.put('/', formal_instruction_activity_controller_1.default.update);
router.delete('/', formal_instruction_activity_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWFsLWluc3RydWN0aW9uLWFjdGl2aXR5LnJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWN0aXZpdHkvZm9ybWFsLWluc3RydWN0aW9uL2Zvcm1hbC1pbnN0cnVjdGlvbi1hY3Rpdml0eS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsc0hBQTJGO0FBRTNGLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0RBQW1DLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZ0RBQW1DLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsZ0RBQW1DLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0RBQW1DLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0RBQW1DLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZ0RBQW1DLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFL0Qsa0JBQWUsTUFBTSxDQUFDIn0=
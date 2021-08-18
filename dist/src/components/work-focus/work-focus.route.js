"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const work_focus_controller_1 = __importDefault(require("./work-focus.controller"));
const router = express_1.default.Router();
router.get('/', work_focus_controller_1.default.all);
router.get('/:_id', work_focus_controller_1.default.byId);
router.post('/', work_focus_controller_1.default.create);
router.put('/', work_focus_controller_1.default.update);
router.delete('/', work_focus_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yay1mb2N1cy5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dvcmstZm9jdXMvd29yay1mb2N1cy5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsb0ZBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsK0JBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsK0JBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsK0JBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsK0JBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsK0JBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFL0Msa0JBQWUsTUFBTSxDQUFDIn0=
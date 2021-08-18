"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const venue_controller_1 = __importDefault(require("./venue.controller"));
const router = express_1.default.Router();
router.get('/', venue_controller_1.default.all);
router.get('/:_id', venue_controller_1.default.byId);
router.post('/', venue_controller_1.default.create);
router.put('/', venue_controller_1.default.update);
router.delete('/', venue_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVudWUucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdmVudWUvdmVudWUucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QiwwRUFBaUQ7QUFFakQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwwQkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDBCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsMEJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwwQkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLDBCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0Msa0JBQWUsTUFBTSxDQUFDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const duty_controller_1 = __importDefault(require("./duty.controller"));
const router = express_1.default.Router();
router.get('/', duty_controller_1.default.all);
router.get('/:_id', duty_controller_1.default.byId);
router.get('/dutyId/:dutyId', duty_controller_1.default.byDutyId);
router.post('/', duty_controller_1.default.create);
router.put('/', duty_controller_1.default.update);
router.delete('/', duty_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHV0eS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kdXR5L2R1dHkucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5Qix3RUFBK0M7QUFFL0MsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx5QkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHlCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUseUJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTFDLGtCQUFlLE1BQU0sQ0FBQyJ9
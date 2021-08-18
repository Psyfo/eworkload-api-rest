"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const workload_controller_1 = __importDefault(require("./workload.controller"));
const router = express_1.default.Router();
router.get('/', workload_controller_1.default.all);
router.get('/:_id', workload_controller_1.default.byId);
router.get('/user/:userId', workload_controller_1.default.byUserId);
router.post('/', workload_controller_1.default.create);
router.put('/', workload_controller_1.default.update);
router.delete('/', workload_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2xvYWQucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy93b3JrbG9hZC93b3JrbG9hZC5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFFOUIsZ0ZBQXVEO0FBRXZELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNkJBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNkJBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsNkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsNkJBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNkJBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsNkJBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFOUMsa0JBQWUsTUFBTSxDQUFDIn0=
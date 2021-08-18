"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router.post('/login', auth_controller_1.default.login);
router.post('/changePassword', auth_controller_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9hdXRoLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUEyRDtBQUMzRCxzREFBOEI7QUFDOUIsd0VBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUseUJBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHlCQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFOUQsa0JBQWUsTUFBTSxDQUFDIn0=
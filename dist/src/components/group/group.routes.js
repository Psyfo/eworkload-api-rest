"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const group_controller_1 = __importDefault(require("./group.controller"));
const router = express_1.Router();
router.get('/', group_controller_1.default.all);
router.get('/:_id', group_controller_1.default.byId);
router.get('/moduleId/:moduleId', group_controller_1.default.byModuleId);
router.get('/', group_controller_1.default.all);
router.post('/', group_controller_1.default.create);
router.put('/', group_controller_1.default.update);
router.delete('/', group_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZ3JvdXAvZ3JvdXAucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHFDQUFpQztBQUVqQywwRUFBaUQ7QUFFakQsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDBCQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsMEJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLDBCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsMEJBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSwwQkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDBCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsMEJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQyxrQkFBZSxNQUFNLENBQUMifQ==
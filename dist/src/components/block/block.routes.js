"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const block_controller_1 = __importDefault(require("./block.controller"));
const router = express_1.default.Router();
router.get('/', block_controller_1.default.all);
router.get('/:_id', block_controller_1.default.byId);
router.get('/blockId/:blockId', block_controller_1.default.byBlockId);
router.post('/', block_controller_1.default.create);
router.put('/', block_controller_1.default.update);
router.delete('/', block_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2sucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmxvY2svYmxvY2sucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUM5QiwwRUFBaUQ7QUFFakQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwwQkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDBCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSwwQkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLDBCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsMEJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSwwQkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNDLGtCQUFlLE1BQU0sQ0FBQyJ9
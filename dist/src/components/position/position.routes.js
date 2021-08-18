"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const position_controller_1 = __importDefault(require("./position.controller"));
const router = express_1.default.Router();
router.get('/', position_controller_1.default.all);
router.get('/:_id', position_controller_1.default.byId);
router.post('/', position_controller_1.default.create);
router.put('/', position_controller_1.default.update);
router.delete('/', position_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24ucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcG9zaXRpb24vcG9zaXRpb24ucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QixnRkFBdUQ7QUFFdkQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSw2QkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSw2QkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSw2QkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSw2QkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSw2QkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU5QyxrQkFBZSxNQUFNLENBQUMifQ==
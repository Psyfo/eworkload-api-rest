"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const offering_type_controller_1 = __importDefault(require("./offering-type.controller"));
const router = express_1.default.Router();
router.get('/', offering_type_controller_1.default.all);
router.get('/:_id', offering_type_controller_1.default.byId);
router.post('/', offering_type_controller_1.default.create);
router.put('/', offering_type_controller_1.default.update);
router.delete('/', offering_type_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXJpbmctdHlwZS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vZmZlcmluZy10eXBlL29mZmVyaW5nLXR5cGUucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QiwwRkFBZ0U7QUFFaEUsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQ0FBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxrQ0FBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxrQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxrQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVsRCxrQkFBZSxNQUFNLENBQUMifQ==
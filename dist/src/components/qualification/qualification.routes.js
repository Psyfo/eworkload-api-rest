"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const qualification_controller_1 = __importDefault(require("./qualification.controller"));
const router = express_1.default.Router();
router.get('/', qualification_controller_1.default.all);
router.get('/:_id', qualification_controller_1.default.byId);
router.post('/', qualification_controller_1.default.create);
router.put('/', qualification_controller_1.default.update);
router.delete('/', qualification_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbGlmaWNhdGlvbi5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9xdWFsaWZpY2F0aW9uL3F1YWxpZmljYXRpb24ucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELHNEQUE4QjtBQUU5QiwwRkFBaUU7QUFFakUsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQ0FBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxrQ0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxrQ0FBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQ0FBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxrQ0FBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVuRCxrQkFBZSxNQUFNLENBQUMifQ==
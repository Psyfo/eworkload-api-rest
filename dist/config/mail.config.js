"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'c4mahlangu@gmail.com',
        pass: 'mahlangu3003!'
    }
});
exports.default = transporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb25maWcvbWFpbC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBb0M7QUFFcEMsTUFBTSxXQUFXLEdBQVEsb0JBQVUsQ0FBQyxlQUFlLENBQUM7SUFDbEQsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixJQUFJLEVBQUUsZUFBZTtLQUN0QjtDQUNGLENBQUMsQ0FBQztBQUVILGtCQUFlLFdBQVcsQ0FBQyJ9
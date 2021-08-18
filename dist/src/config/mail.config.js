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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL21haWwuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW9DO0FBRXBDLE1BQU0sV0FBVyxHQUFRLG9CQUFVLENBQUMsZUFBZSxDQUFDO0lBQ25ELE9BQU8sRUFBRSxPQUFPO0lBQ2hCLElBQUksRUFBRTtRQUNMLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsSUFBSSxFQUFFLGVBQWU7S0FDckI7Q0FDRCxDQUFDLENBQUM7QUFFSCxrQkFBZSxXQUFXLENBQUMifQ==
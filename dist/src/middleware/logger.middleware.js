"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const logger_config_1 = require("../config/logger.config");
const LoggerMiddleware = {
    reqLog(req, res, next) {
        logger_config_1.logger.warn('========== REQ LOG START ==========');
        logger_config_1.logger.info(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment_1.default().format()}`);
        logger_config_1.logger.info(`body: ${JSON.stringify(req.body)}`);
        logger_config_1.logger.info(`params: ${JSON.stringify(req.params)}`);
        logger_config_1.logger.info(`path: ${JSON.stringify(req.path)}`);
        logger_config_1.logger.info(`query: ${JSON.stringify(req.query)}`);
        logger_config_1.logger.warn('========== REQ LOG END ==========');
        next();
    }
};
exports.default = LoggerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZS9sb2dnZXIubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9EQUE0QjtBQUU1QiwyREFBaUQ7QUFFakQsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUNwRCxzQkFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ25ELHNCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEtBQUssZ0JBQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RixzQkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRCxzQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCxzQkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRCxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRCxzQkFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxnQkFBZ0IsQ0FBQyJ9
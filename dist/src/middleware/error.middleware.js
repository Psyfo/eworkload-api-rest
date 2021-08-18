"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_config_1 = require("../config/logger.config");
class ErrorMiddleware {
}
ErrorMiddleware.errorHandler = (err, req, res, next) => {
    logger_config_1.logger.warn('Error handling middleware has caught your issue');
    logger_config_1.logger.error(`error name: ${err.name}`);
    logger_config_1.logger.error(`error message: ${err.message}`);
    res.status(500).json({
        name: err.name,
        message: err.message,
        stack: err.stack,
        error: err
    });
    next(err);
};
exports.default = ErrorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwyREFBaUQ7QUFFakQsTUFBTSxlQUFlOztBQUNYLDRCQUFZLEdBQUcsQ0FBQyxHQUFVLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFPLEVBQUU7SUFDNUYsc0JBQU0sQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUMvRCxzQkFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLHNCQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUU5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7UUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87UUFDcEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ1YsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBR0Ysa0JBQWUsZUFBZSxDQUFDIn0=
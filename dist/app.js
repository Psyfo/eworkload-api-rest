"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const authRouter = __importStar(require("./src/auth/auth.routes"));
const aaRouter = __importStar(require("./src/components/activity/academic-administration/academic-adminitration-activity.route"));
const ciRouter = __importStar(require("./src/components/activity/community-instruction/community-instruction-activity.route"));
const fiRouter = __importStar(require("./src/components/activity/formal-instruction/formal-instruction-activity.route"));
const pdRouter = __importStar(require("./src/components/activity/personnel-development/personnel-development-activity.route"));
const psRouter = __importStar(require("./src/components/activity/public-service/public-service-activity.route"));
const rRouter = __importStar(require("./src/components/activity/research/research-activity.route"));
const sRouter = __importStar(require("./src/components/activity/supervision/supervision-activity.route"));
const blockRouter = __importStar(require("./src/components/block/block.routes"));
const departmentRouter = __importStar(require("./src/components/department/department.routes"));
const disciplineRouter = __importStar(require("./src/components/discipline/discipline.routes"));
const dutyRouter = __importStar(require("./src/components/duty/duty.routes"));
const facultyRouter = __importStar(require("./src/components/faculty/faculty.routes"));
const groupRouter = __importStar(require("./src/components/group/group.routes"));
const moduleRouter = __importStar(require("./src/components/module/module.routes"));
const offeringTypeRouter = __importStar(require("./src/components/offering-type/offering-type.routes"));
const positionRouter = __importStar(require("./src/components/position/position.routes"));
const qualificationRouter = __importStar(require("./src/components/qualification/qualification.routes"));
const studentRouter = __importStar(require("./src/components/student/student.routes"));
const userRouter = __importStar(require("./src/components/user/users.routes"));
const venueRouter = __importStar(require("./src/components/venue/venue.routes"));
const workFocusRouter = __importStar(require("./src/components/work-focus/work-focus.route"));
const config_1 = __importDefault(require("./src/config/config"));
const keys_config_1 = __importDefault(require("./src/config/keys.config"));
const logger_config_1 = require("./src/config/logger.config");
const error_middleware_1 = __importDefault(require("./src/middleware/error.middleware"));
const indexRouter = __importStar(require("./src/routes/index.routes"));
// CONFIG VARIABLES
const app = express_1.default();
const db = keys_config_1.default.MongoURI;
const PORT = config_1.default.PORT || 3000;
// MONGOOSE CONFIG
mongoose_1.default
    .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
    logger_config_1.logger.info('MongoDB connected...');
})
    .catch(err => {
    logger_config_1.logger.error(err);
});
mongoose_1.default.set('debug', false);
mongoose_1.default.connection.on('error', error => logger_config_1.logger.error(error));
// MIDDLEWARE (BE AWARE THAT ORDER MAY BE RELEVANT)
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use(cors_1.default());
app.use(compression_1.default());
//app.use(LoggerMiddleware.reqLog);
app.use('/', indexRouter.default);
app.use('/auth', authRouter.default);
app.use('/blocks', blockRouter.default);
app.use('/departments', departmentRouter.default);
app.use('/disciplines', disciplineRouter.default);
app.use('/duties', dutyRouter.default);
app.use('/faculties', facultyRouter.default);
app.use('/groups', groupRouter.default);
app.use('/modules', moduleRouter.default);
app.use('/offering-types', offeringTypeRouter.default);
app.use('/positions', positionRouter.default);
app.use('/qualifications', qualificationRouter.default);
app.use('/students', studentRouter.default);
app.use('/venues', venueRouter.default);
app.use('/users', userRouter.default);
app.use('/formal-instruction-activities', fiRouter.default);
app.use('/academic-administration-activities', aaRouter.default);
app.use('/community-instruction-activities', ciRouter.default);
app.use('/personnel-development-activities', pdRouter.default);
app.use('/public-service-activities', psRouter.default);
app.use('/research-activities', rRouter.default);
app.use('/supervision-activities', sRouter.default);
app.use('/work-focuses', workFocusRouter.default);
app.use(error_middleware_1.default.errorHandler);
// SERVE & LISTEN
const httpServer = http_1.createServer(app);
httpServer.listen({ port: PORT }, () => logger_config_1.logger.info(`Server running at: http://localhost:${PORT}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFzQztBQUN0QyxnREFBd0I7QUFDeEIsc0RBQThCO0FBQzlCLCtCQUFvQztBQUNwQyx3REFBZ0M7QUFDaEMsZ0RBQXdCO0FBRXhCLG1FQUFxRDtBQUNyRCxrSUFBb0g7QUFDcEgsK0hBQWlIO0FBQ2pILHlIQUEyRztBQUMzRywrSEFBaUg7QUFDakgsaUhBQW1HO0FBQ25HLG9HQUFzRjtBQUN0RiwwR0FBNEY7QUFDNUYsaUZBQW1FO0FBQ25FLGdHQUFrRjtBQUNsRixnR0FBa0Y7QUFDbEYsOEVBQWdFO0FBQ2hFLHVGQUF5RTtBQUN6RSxpRkFBbUU7QUFDbkUsb0ZBQXNFO0FBQ3RFLHdHQUEwRjtBQUMxRiwwRkFBNEU7QUFDNUUseUdBQTJGO0FBQzNGLHVGQUF5RTtBQUN6RSwrRUFBaUU7QUFDakUsaUZBQW1FO0FBQ25FLDhGQUFnRjtBQUNoRixpRUFBeUM7QUFDekMsMkVBQWdEO0FBQ2hELDhEQUFvRDtBQUNwRCx5RkFBZ0U7QUFDaEUsdUVBQXlEO0FBRXpELG1CQUFtQjtBQUNuQixNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsTUFBTSxFQUFFLEdBQUcscUJBQVEsQ0FBQyxRQUFRLENBQUM7QUFDN0IsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRWpDLGtCQUFrQjtBQUNsQixrQkFBUTtLQUNOLE9BQU8sQ0FBQyxFQUFFLEVBQUU7SUFDWixlQUFlLEVBQUUsSUFBSTtJQUNyQixjQUFjLEVBQUUsSUFBSTtJQUNwQixnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLGtCQUFrQixFQUFFLElBQUk7Q0FDeEIsQ0FBQztLQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDVixzQkFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxD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
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
const keys_config_1 = __importDefault(require("./config/keys.config"));
const logger_config_1 = require("./config/logger.config");
const config_1 = __importDefault(require("./config/config"));
const indexRouter = __importStar(require("./routes/index.routes"));
const blockRouter = __importStar(require("./routes/block.routes"));
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
    useUnifiedTopology: true,
})
    .then(() => {
    logger_config_1.logger.info("MongoDB connected...");
})
    .catch((err) => {
    logger_config_1.logger.error(err);
});
mongoose_1.default.set("debug", false);
mongoose_1.default.connection.on("error", (error) => logger_config_1.logger.error(error));
// MIDDLEWARE (BE AWARE THAT ORDER MAY BE RELEVANT)
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(cors_1.default());
app.use(compression_1.default());
app.use("/", indexRouter.default);
app.use("/blocks", blockRouter.default);
// SERVE & LISTEN
const httpServer = http_1.createServer(app);
httpServer.listen({ port: PORT }, () => logger_config_1.logger.info(`Server running at: http://localhost:${PORT}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFzQztBQUN0QyxnREFBd0I7QUFDeEIsc0RBQThCO0FBQzlCLCtCQUFvQztBQUNwQyx3REFBZ0M7QUFDaEMsZ0RBQXdCO0FBRXhCLHVFQUEyRDtBQUMzRCwwREFBZ0Q7QUFJaEQsNkRBQXFDO0FBQ3JDLG1FQUFxRDtBQUNyRCxtRUFBcUQ7QUFFckQsbUJBQW1CO0FBQ25CLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUN0QixNQUFNLEVBQUUsR0FBRyxxQkFBUSxDQUFDLFFBQVEsQ0FBQztBQUM3QixNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFakMsa0JBQWtCO0FBQ2xCLGtCQUFRO0tBQ0wsT0FBTyxDQUFDLEVBQUUsRUFBRTtJQUNYLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsa0JBQWtCLEVBQUUsSUFBSTtDQUN6QixDQUFDO0tBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNULHNCQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDYixzQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQztBQUNMLGtCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3QixrQkFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBRWhFLG1EQUFtRDtBQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUNMLGlCQUFPLENBQUMsVUFBVSxDQUFDO0lBQ2pCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FDSCxDQUFDO0FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVcsRUFBRSxDQUFDLENBQUM7QUFFdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV4QyxpQkFBaUI7QUFDakIsTUFBTSxVQUFVLEdBQUcsbUJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUNyQyxzQkFBTSxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsSUFBSSxFQUFFLENBQUMsQ0FDM0QsQ0FBQyJ9
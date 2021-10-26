import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import path from 'path';
import * as authRouter from './src/auth/auth.routes';
import * as aaRouter from './src/components/activity/academic-administration/academic-administration-activity.route';
import * as ciRouter from './src/components/activity/community-instruction/community-instruction-activity.route';
import * as fiRouter from './src/components/activity/formal-instruction/formal-instruction-activity.route';
import * as pdRouter from './src/components/activity/personnel-development/personnel-development-activity.route';
import * as psRouter from './src/components/activity/public-service/public-service-activity.route';
import * as rRouter from './src/components/activity/research/research-activity.route';
import * as sRouter from './src/components/activity/supervision/supervision-activity.route';
import * as blockRouter from './src/components/block/block.routes';
import * as departmentRouter from './src/components/department/department.routes';
import * as disciplineRouter from './src/components/discipline/discipline.routes';
import * as dutyRouter from './src/components/duty/duty.routes';
import * as facultyRouter from './src/components/faculty/faculty.routes';
import * as groupRouter from './src/components/group/group.routes';
import * as moduleRouter from './src/components/module/module.routes';
import * as offeringTypeRouter from './src/components/offering-type/offering-type.routes';
import * as positionRouter from './src/components/position/position.routes';
import * as qualificationRouter from './src/components/qualification/qualification.routes';
import * as studentRouter from './src/components/student/student.routes';
import * as userRouter from './src/components/user/users.routes';
import * as venueRouter from './src/components/venue/venue.routes';
import * as workFocusRouter from './src/components/work-focus/work-focus.route';
import * as workloadRouter from './src/components/workload/workload.route';
import config from './src/config/config';
import dbConfig from './src/config/keys.config';
import { logger } from './src/config/logger.config';
import ErrorMiddleware from './src/middleware/error.middleware';
import * as indexRouter from './src/routes/index.routes';

// CONFIG VARIABLES
const app = express();
const db = dbConfig.MongoURI;
const PORT = config.PORT || 3000;

// MONGOOSE CONFIG
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		logger.info('MongoDB connected...');
	})
	.catch(err => {
		logger.error(err);
	});
mongoose.set('debug', false);
mongoose.connection.on('error', error => logger.error(error));

// MIDDLEWARE (BE AWARE THAT ORDER MAY BE RELEVANT)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(cors());
app.use(compression());
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
app.use('/workload', workloadRouter.default);

app.use(ErrorMiddleware.errorHandler);

// SERVE & LISTEN
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, () => logger.info(`Server running at: http://localhost:${PORT}`));

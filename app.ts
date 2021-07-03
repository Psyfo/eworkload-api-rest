import { json } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import moment from 'moment';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';

import config from './config/config';
import { default as dbConfig } from './config/keys.config';
import { logger } from './config/logger.config';
import ErrorMiddleware from './middleware/error.middleware';
import LoggerMiddleware from './middleware/logger.middleware';
import * as blockRouter from './routes/block.routes';
import * as departmentRouter from './routes/department.routes';
import * as disciplineRouter from './routes/discipline.routes';
import * as dutyRouter from './routes/duty.routes';
import * as facultyRouter from './routes/faculty.routes';
import * as groupRouter from './routes/group.routes';
import * as indexRouter from './routes/index.routes';
import * as moduleRouter from './routes/module.routes';
import * as offeringTypeRouter from './routes/offering-type.routes';
import * as positionRouter from './routes/position.routes';
import * as qualificationRouter from './routes/qualification.routes';
import * as studentRouter from './routes/student.routes';
import * as venueRouter from './routes/venue.routes';
import * as userRouter from './users/users.routes';
import * as authRouter from './auth/auth.routes';

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
  .catch((err) => {
    logger.error(err);
  });
mongoose.set('debug', false);
mongoose.connection.on('error', (error) => logger.error(error));

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
app.use(LoggerMiddleware.reqLog);

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


app.use(ErrorMiddleware.errorHandler);

// SERVE & LISTEN
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, () => logger.info(`Server running at: http://localhost:${PORT}`));

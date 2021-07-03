import { NextFunction, Request, Response } from 'express';

import { logger } from '../config/logger.config';

const ErrorMiddleware = {
  errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.warn('Error handling middleware has caught your issue');
    logger.error(`error name: ${err.name}`);
    logger.error(`error message: ${err.message}`);
    // next();
    res.status(500).json({
      name: err.name,
      message: err.message,
      stack: err.stack
    });
  }
};

export default ErrorMiddleware;

import { NextFunction, Request, Response } from 'express';

import { logger } from '../../config/logger.config';
import IOfferingType from './offering-type.interface';
import OfferingType from './offering-type.model';

const OfferingTypeController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await OfferingType.find({});
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const result: IOfferingType = await OfferingType.findOne({ _id: req.params._id });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newOfferingType: IOfferingType = await new OfferingType(req.body).save();
      const result = await OfferingType.findOne({ _id: newOfferingType._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await OfferingType.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { upsert: true }
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await OfferingType.findOneAndRemove({ _id: req.body._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async exists(req: Request, res: Response, next: NextFunction) {}
};

export default OfferingTypeController;

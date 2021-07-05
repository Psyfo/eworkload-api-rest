import { NextFunction, Request, Response } from 'express';

import { logger } from '../../config/logger.config';
import IVenue from './venue.interface';
import Venue from './venue.model';

const VenueController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Venue.find({});
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
      const result: IVenue = await Venue.findOne({ _id: req.params._id });
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
      const newVenue: IVenue = await new Venue(req.body).save();
      const result = await Venue.findOne({ _id: newVenue._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Venue.findOneAndUpdate(
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
      const result = await Venue.findOneAndRemove({ _id: req.body._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async exists(req: Request, res: Response, next: NextFunction) {}
};

export default VenueController;

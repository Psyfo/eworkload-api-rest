import { NextFunction, Request, Response } from 'express';

import { logger } from '../../config/logger.config';
import { IQualification } from './qualification.interface';
import Qualification from './qualification.model';

const QualificationController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Qualification.find({}).populate('department');
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
      const result: IQualification = await Qualification.findOne({ _id: req.params._id }).populate('department');
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
      const newQualification: IQualification = await new Qualification(req.body).save();
      const result = await Qualification.findOne({ _id: newQualification._id }).populate('department');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Qualification.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { upsert: true }
      ).populate('department');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Qualification.findOneAndRemove({ _id: req.body._id }).populate('department');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async exists(req: Request, res: Response, next: NextFunction) {}
};

export default QualificationController;

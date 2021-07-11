import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../config/logger.config';
import { IModule } from './module.interface';
import Module from './module.model';

const ModuleController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Module.find().populate('discipline')
      .populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');
      
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Module.findOne({ _id: req.params._id })      .populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byDiscipline(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Module.find({disciplineId: req.params.discipline})      .populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byQualification(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Module.find({ qualificationId: req.params.qualificationId }).populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byCoordinator(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Module.find({ coordinatorId: req.params.coordinatorId }).populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newModule: IModule = await new Module(req.body).save();
      const result = await Module.findOne({ _id: newModule._id }).populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Module.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        {
          $set: req.body
        },
        { upsert: true }
      ).populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Object updated');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result: IModule = await Module.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id)).populate({
        path: 'qualification',
        model: 'Qualification',
        populate: {
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        }
      })
      .populate('offeringType')
      .populate('block');;
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Object deleted');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },

};

export default ModuleController;

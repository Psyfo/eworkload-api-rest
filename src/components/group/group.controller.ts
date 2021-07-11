import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../config/logger.config';
import { IGroup } from './group.interface';
import Group from './group.model';

const GroupController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Group.find().populate({
        path: 'module',
        populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
      });
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
      const result = await Group.findOne({ _id: req.params._id }).populate({
        path: 'module',
        populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
      });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }

      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byModuleId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Group.find({ moduleId: req.params.moduleId }).populate({
        path: 'module',
        populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
      });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }

      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async groupTotal(req: Request, res: Response, next: NextFunction) {},
  async remainingStudents(req: Request, res: Response, next: NextFunction) {},
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newGroup: IGroup = await new Group(req.body).save();
      const result = await Group.findOne({ _id: newGroup._id }).populate({
        path: 'module',
        populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
      });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Group.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        {
          $set: req.body
        },
        { upsert: true }
      ).populate({
        path: 'module',
        populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
      });
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
      const result: IGroup = await Group.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id)).populate({
        path: 'module',
        populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
      });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Object deleted');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
};

export default GroupController;

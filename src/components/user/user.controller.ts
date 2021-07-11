import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../config/logger.config';
import { IUser } from './user.interface';
import User from './user.model';

const UserController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.find({})
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
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
      const result: IUser = await User.findOne({ _id: req.params._id })
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }

      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.findOne({ userId: req.params.userId })
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byPosition(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.findOne({ positionId: req.params.positionId })
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
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
      const newUser: IUser = await new User(req.body).save();
      const result = await User.findOne({ _id: newUser._id })
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        {
          $set: req.body
        },
        { upsert: true }
      )
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
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
      const result: IUser = await User.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id))
        .populate('disciplines')
        .populate({
          path: 'department',
          model: 'Department',
          populate: {
            path: 'faculty',
            model: 'Faculty'
          }
        })
        .populate('position')
        .populate('workFocus');
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
  async exists(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.exists({ _id: req.params._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
};

export default UserController;

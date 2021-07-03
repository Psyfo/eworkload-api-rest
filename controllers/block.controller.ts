import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

import { logger } from '../config/logger.config';
import IBlock from '../interfaces/block.interface';
import Block from '../models/block.model';

const BlockController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Block.find();
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Block.findOne({ _id: req.params._id });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byBlockId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Block.findOne({ blockId: req.params.blockId });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newBlock: IBlock = await new Block(req.body).save();
      const result = await Block.findOne({ _id: newBlock._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Block.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        {
          $set: req.body
        },
        { upsert: true }
      );
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
      const result: IBlock = await Block.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default BlockController;

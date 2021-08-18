/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { logger } from '../../config/logger.config';
import {IDuty} from './duty.interface';
import Duty from './duty.model';

class DutyController  {
   static all = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const result: IDuty[] = await Duty.find();
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
   static byId = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const result:IDuty = await Duty.findOne({ _id: req.params._id });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
   static create = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const newDuty: IDuty = new Duty(req.body)
      await newDuty.save();
      const result = await Duty.findOne({ _id: newDuty._id });
      logger.info('Object created');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
   static update = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> =>{
    try {
      const result:IDuty = await Duty.findByIdAndUpdate(
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
  }
   static delete = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> =>{
    try {
      const result: IDuty = await Duty.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default DutyController;

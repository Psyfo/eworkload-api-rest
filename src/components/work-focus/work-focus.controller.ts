import { NextFunction, Request, Response } from 'express';

import { logger } from '../../config/logger.config';
import parameters from '../../config/parameters.config';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { IWorkFocus } from './work-focus.interface';
import WorkFocus from './work-focus.model';

const WorkFocusController = {
  async workFocus(name: string) {
    return await WorkFocus.findOne({ name: name });
  },
  async workFocuses() {
    return await WorkFocus.find({});
  },
  async teachingHours(userId: string) {
    const user: IUser = await User.findOne({ userId: userId }).populate('work-focus');
    const workFocus: IWorkFocus = (await this.workFocus(user.workFocusName)) as IWorkFocus;
    const teachingFocusPercentage: number = workFocus.teachingRatio;
    return (teachingFocusPercentage / 100) * parameters.annual_total_hours;
  },
  async researchHours(userId: string) {
    const user: IUser = await User.findOne({ userId: userId }).populate('work-focus');
    const workFocus: IWorkFocus = (await this.workFocus(user.workFocusName)) as IWorkFocus;
    const researchFocusPercentage: number = workFocus.researchRatio;
    return (researchFocusPercentage / 100) * parameters.annual_total_hours;
  },
  async serviceHours(userId: string) {
    const user: IUser = await User.findOne({ userId: userId }).populate('work-focus');
    const workFocus: IWorkFocus = (await this.workFocus(user.workFocusName)) as IWorkFocus;
    const serviceFocusPercentage: number = workFocus.serviceRatio;

    return (serviceFocusPercentage / 100) * parameters.annual_total_hours;
  },
  async annualHours() {
    return parameters.annual_total_hours;
  },
  // async createWorkFocus(workFocus: IWorkFocus) {
  //   return await workFocus.save();
  // },
  async updateWorkFocus(workFocus: IWorkFocus) {
    return await WorkFocus.findOneAndUpdate(
      { name: workFocus.name },
      {
        $set: workFocus
      },
      { upsert: true }
    );
  },
  async deleteWorkFocus(workFocus: IWorkFocus) {
    return await WorkFocus.findOneAndRemove({ _id: workFocus._id });
  },
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await WorkFocus.find({});
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
      const result: IWorkFocus = await WorkFocus.findOne({ _id: req.params._id });
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
      const newWorkFocus: IWorkFocus = await new WorkFocus(req.body).save();
      const result = await WorkFocus.findOne({ _id: newWorkFocus._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await WorkFocus.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await WorkFocus.findOneAndRemove({ _id: req.body._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  }
};

export default WorkFocusController;

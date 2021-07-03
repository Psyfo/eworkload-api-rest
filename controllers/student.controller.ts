import { NextFunction, Request, Response } from 'express';

import { logger } from '../config/logger.config';
import IStudent from '../interfaces/student.interface';
import Student from '../models/student.model';
import SupervisionWorkload from '../models/workload/supervision.model';

const StudentController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Student.find({});
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
      const result: IStudent = await Student.findOne({ _id: req.params._id });
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
      const newStudent: IStudent = await new Student(req.body).save();
      const result = await Student.findOne({ _id: newStudent._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Student.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Student.findOneAndRemove({ _id: req.body._id });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async supervisor(req: Request, res: Response, next: NextFunction){},
  async exists(req: Request, res: Response, next: NextFunction) {}
};

export default StudentController;

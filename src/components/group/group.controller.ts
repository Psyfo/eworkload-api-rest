import { NextFunction, Request, Response } from 'express';
import mongoose, { model } from 'mongoose';

import { logger } from '../../config/logger.config';
import IGroup from './group.interface';
import IModule from '../module/module.interface';
import Group from './group.model';
import ModuleController from '../module/module.controller';

class GroupControl {
  // public static async group(id: string) {
  //   return await Group.findOne({ _id: id }).populate('module');
  // }
  // public static async groups() {
  //   return await Group.find({}).populate('module');
  // }
  // public static async groupsByModule(moduleId: string) {
  //   return await Group.find({ moduleId: moduleId }).populate('module');
  // }
  // public static async groupTotal(moduleId: string) {
  //   const groups: IGroup[] = (await this.groupsByModule(moduleId)) as IGroup[];
  //   let total = 0;
  //   for (let group of groups) {
  //     total += group.studentsEnrolled;
  //   }
  //   return total;
  // }
  // public static async remainingStudents(moduleId: string) {
  //   const module: IModule = (await ModuleController.module(moduleId)) as IModule;
  //   const groupTotal: number = await this.groupTotal(moduleId);
  //   const remaining: number = module.studentsEnrolled - groupTotal;
  //   return remaining;
  // }
  // public static async groupExists(groupId: string, moduleId: string) {
  //   const count = await Group.count({ groupId: groupId, moduleId: moduleId });
  //   if (count !== 0) {
  //     return true;
  //   }
  //   return false;
  // }
  // public static async createGroup(group: IGroup) {
  //   return await new Group(group).save();
  // }
  // public static async updateGroup(group: IGroup) {
  //   return await Group.findOneAndUpdate(
  //     {
  //       _id: group.id
  //     },
  //     {
  //       $set: {
  //         group
  //       }
  //     },
  //     { upsert: true }
  //   );
  // }
  // public static async deleteGroup(group: IGroup) {
  //   return await Group.findOneAndRemove({ _id: group.id });
  // }
}

const GroupController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Group.find();
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
      const result = await Group.findOne({ _id: req.params._id });
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
  async byModuleId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Group.findOne({ moduleId: req.params.moduleId });
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
  async groupTotal(req: Request, res: Response, next: NextFunction) {},
  async remainingStudents(req: Request, res: Response, next: NextFunction) {},
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newGroup: IGroup = await new Group(req.body).save();
      const result = await Group.findOne({ _id: newGroup._id });
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
      const result: IGroup = await Group.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

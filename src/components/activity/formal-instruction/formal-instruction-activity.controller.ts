import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';
import { IGroup } from '../../group/group.interface';
import Group from '../../group/group.model';
import { IModule } from '../../module/module.interface';
import Module from '../../module/module.model';
import WorkFocusController from '../../work-focus/work-focus.controller';
import { IFormalInstructionWorkload } from '../../workload/formal-instruction/formal-instruction-workload.interface';
import { IFormalInstructionActivity } from './formal-instruction-activity.interface';
import FormalInstructionActivity from './formal-instruction-activity.model';

const FormalInstructionActivityController = {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FormalInstructionActivity.find({})
        .populate({
          path: 'user',
          model: 'User',
          populate: [
            { path: 'disciplines', model: 'Discipline' },
            { path: 'position', model: 'Position' },
            { path: 'workFocus', model: 'WorkFocus' },
            { path: 'department', model: 'Department' }
          ]
        })
        .populate('duty')
        .populate({
          path: 'group',
          populate: {
            path: 'module',
            populate: [
              { path: 'block' },
              { path: 'offeringType' },
              { path: 'qualification' },
              { path: 'discipline' },
              { path: 'venue' }
            ]
          }
        });
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
      const result = await FormalInstructionActivity.findOne({ _id: mongoose.Types.ObjectId(req.params._id) })
        .populate('user')
        .populate('duty')
        .populate({
          path: 'group',
          model: 'Group',
          populate: [
            {
              path: 'module',
              model: 'Module',
              populate: [
                { path: 'block' },
                { path: 'offeringType' },
                { path: 'qualification' },
                { path: 'discipline' },
                { path: 'venue' }
              ]
            }
          ]
        });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      //FormalInstructionActivityController.calcWorkload(result._id);
      logger.info('Request successful');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async byUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FormalInstructionActivity.find({ userId: req.params.userId })
        .populate({
          path: 'user',
          model: 'User',
          populate: [
            { path: 'disciplines', model: 'Discipline' },
            { path: 'position', model: 'Position' },
            { path: 'workFocus', model: 'WorkFocus' },
            { path: 'department', model: 'Department' }
          ]
        })
        .populate('duty')
        .populate({
          path: 'group',
          populate: {
            path: 'module',
            populate: [
              { path: 'block' },
              { path: 'offeringType' },
              { path: 'qualification' },
              { path: 'discipline' },
              { path: 'venue' }
            ]
          }
        });
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
      const newFormalInstructionActivity = await new FormalInstructionActivity(req.body).save();
      const result: IFormalInstructionActivity = await FormalInstructionActivity.findOne({
        _id: newFormalInstructionActivity._id
      })
        .populate({
          path: 'user',
          model: 'User',
          populate: [
            { path: 'disciplines', model: 'Discipline' },
            { path: 'position', model: 'Position' },
            { path: 'workFocus', model: 'WorkFocus' },
            { path: 'department', model: 'Department' }
          ]
        })
        .populate('duty')
        .populate({
          path: 'group',
          populate: {
            path: 'module',
            populate: [
              { path: 'formalInstructionActivity' },
              { path: 'offeringType' },
              { path: 'qualification' },
              { path: 'discipline' },
              { path: 'venue' }
            ]
          }
        });
      logger.info('Object created');
      //update workload
      //await FormalInstructionActivityController.calcWorkload(result._id);

      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FormalInstructionActivity.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        {
          $set: req.body
        },
        { upsert: true }
      )
        .populate({
          path: 'user',
          model: 'User',
          populate: [
            { path: 'disciplines', model: 'Discipline' },
            { path: 'position', model: 'Position' },
            { path: 'workFocus', model: 'WorkFocus' },
            { path: 'department', model: 'Department' }
          ]
        })
        .populate('duty')
        .populate({
          path: 'group',
          populate: {
            path: 'module',
            populate: [
              { path: 'formalInstructionActivity' },
              { path: 'offeringType' },
              { path: 'qualification' },
              { path: 'discipline' },
              { path: 'venue' }
            ]
          }
        });
      if (!result) {
        return res.status(400).json({ message: 'No result found' });
      }
      // update workload
      //await this.calcWorkload(result._id);
      logger.info('Object updated');
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FormalInstructionActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id))
        .populate({
          path: 'user',
          model: 'User',
          populate: [
            { path: 'disciplines', model: 'Discipline' },
            { path: 'position', model: 'Position' },
            { path: 'workFocus', model: 'WorkFocus' },
            { path: 'department', model: 'Department' }
          ]
        })
        .populate('duty')
        .populate({
          path: 'group',
          populate: {
            path: 'module',
            populate: [
              { path: 'formalInstructionActivity' },
              { path: 'offeringType' },
              { path: 'qualification' },
              { path: 'discipline' },
              { path: 'venue' }
            ]
          }
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
  },
  async baseContact(activity: any) {
    try {
      return (activity.group.module.credits / 4) * activity.group.module.block.weeks;
    } catch (error) {
      logger.error(error.message);
    }
  },
  async coordination(activity: any) {
    try {
      let coordination = 0;
      if (activity.userId === activity.group.module.coordinatorId) {
        coordination = 5;
        coordination += (activity.group.studentsEnrolled - 100) / 40;
      }
      return coordination;
    } catch (error) {
      logger.error(error.message);
    }
  },
  async studentSupport(activity: any) {
    try {
      return (
        (0.1 * activity.group.studentsEnrolled * activity.group.module.credits) /
        activity.group.module.block.weeks /
        activity.group.modularity
      );
    } catch (error) {
      logger.error(error.message);
    }
  },
  async preparationTime(activity: any) {
    try {
      return ((await this.baseContact(activity)) * (activity.group.module.nqfLevel - 4)) / activity.group.modularity;
    } catch (error) {
      logger.error(error.message);
    }
  },
  async assessmentSetting(activity: any) {
    try {
      return (
        (((10 * activity.group.module.credits) / activity.group.module.block.weeks) *
          (activity.group.module.nqfLevel - 4)) /
        activity.group.modularity
      );
    } catch (error) {
      logger.error(error.message);
    }
  },
  async examMarking(activity: any) {
    return (
      (0.25 *
        activity.group.studentsEnrolled *
        (activity.group.module.credits / activity.group.module.block.weeks) *
        (activity.group.module.nqfLevel - 4)) /
      2 /
      activity.group.modularity
    );
  },
  async courseworkMarking(activity: any) {
    return (
      (0.5 * activity!.group!.studentsEnrolled * (activity.group.module.credits / activity.group.module.block.weeks)) /
      activity.group.modularity
    );
  },
  async feedback(activity: any) {
    return (
      (1 * activity?.group?.studentsEnrolled * (activity.group.module.credits / activity.group.module.block.weeks)) /
      activity.group.modularity
    );
  },
  async formativeAssessment(activity: any) {
    return (
      (0.4 * activity.group.studentsEnrolled * (activity.group.module.credits / activity.group.module.block.weeks)) /
      activity.group.modularity
    );
  },
  async moderation(activity: any) {},
  async otherHours(activity: any) {
    try {
      return await ((await this.coordination(activity)) +
        (await this.studentSupport(activity)) +
        (await this.preparationTime(activity)) +
        (await this.assessmentSetting(activity)) +
        (await this.examMarking(activity)) +
        (await this.courseworkMarking(activity)) +
        (await this.feedback(activity)) +
        (await this.formativeAssessment(activity)));
    } catch (error) {
      logger.error(error.message);
    }
  },
  async totalHours(activity: any) {
    return (await this.baseContact(activity)) + (await this.otherHours(activity));
  },
  async percentageOfTeaching(activity: any) {
    return (await this.totalHours(activity)) / (await WorkFocusController.teachingHours(activity.userId));
  },
  async percentageOfAnnual(activity: any) {
    return (await this.totalHours(activity)) / (await WorkFocusController.annualHours());
  },
  async calcWorkload(activity: any, user: any, group: any, module: any) {
    try {
      // Use activity to calculate workload
      // const activity: IFormalInstructionActivity = await FormalInstructionActivity.findOne({
      //   _id: mongoose.Types.ObjectId(_id)
      // });
      // const group: IGroup = await Group.findOne({ _id: activity.groupId });
      // const module: IModule = await Module.findOne({ _id: group.moduleId });

      // if (!activity) {
      //   logger.error('Activity not found');
      // }
      const workload: IFormalInstructionWorkload = {
        baseContact: await FormalInstructionActivityController.baseContact(activity),
        coordination: await FormalInstructionActivityController.coordination(activity),
        studentSupport: await FormalInstructionActivityController.studentSupport(activity),
        preparationTime: await FormalInstructionActivityController.preparationTime(activity),
        assessmentSetting: await FormalInstructionActivityController.assessmentSetting(activity),
        examMarking: await FormalInstructionActivityController.examMarking(activity),
        courseworkMarking: await FormalInstructionActivityController.courseworkMarking(activity),
        feedback: await FormalInstructionActivityController.feedback(activity),
        formativeAssessment: await FormalInstructionActivityController.formativeAssessment(activity),
        other: await FormalInstructionActivityController.otherHours(activity),
        total: await FormalInstructionActivityController.totalHours(activity),
        percentageOfTeaching: await FormalInstructionActivityController.percentageOfTeaching(activity),
        percentageOfAnnual: await FormalInstructionActivityController.percentageOfAnnual(activity)
      };

      // Update activity with workload
      await FormalInstructionActivity.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(activity._id) },
        {
          $set: {
            workload: workload
          }
        },
        { upsert: true }
      );
      logger.info('fi workload updated');
    } catch (error) {
      logger.error(error);
    }
  }
};

export default FormalInstructionActivityController;

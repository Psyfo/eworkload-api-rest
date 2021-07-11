import { IFormalInstructionActivity } from './formal-instruction-activity.interface';
import { IFormalInstructionWorkload } from './../../workload/formal-instruction/formal-instruction-workload.interface';
import mongoose from 'mongoose';
import WorkloadController from '../../workload/workload.controller';

import Activity from '../activity.model';
import FormalInstructionActivityController from './formal-instruction-activity.controller';
import Group from '../../group/group.model';
import Module from '../../module/module.model';
import User from '../../user/user.model';

const formalInstructionActivitySchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      ref: 'Group'
    },
    isCoordinator: {
      type: Boolean
    },
    workload: {
      baseContact: { type: Number },
      coordination: { type: Number },
      studentSupport: { type: Number },
      preparationTime: { type: Number },
      assessmentSetting: { type: Number },
      examMarking: { type: Number },
      courseworkMarking: { type: Number },
      feedback: { type: Number },
      formativeAssessment: { type: Number },
      other: { type: Number },
      total: { type: Number },
      percentageOfTeaching: { type: Number },
      percentageOfAnnual: { type: Number }
    },
    coordinatorId: {
      type: String,
      ref: 'User'
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// INDEX

// HOOKS

formalInstructionActivitySchema.post('save', async function () {
  const activity: any = await this;
  const group: any = await Group.findOne({ _id: activity.groupId });
  const module: any = await Module.findOne({ _id: activity.group.moduleId });
  const user: any = await User.findOne({ userId: activity.userId });
  await FormalInstructionActivityController.calcWorkload(activity, user, group, module);
});
formalInstructionActivitySchema.pre('find', async function (doc) {
  const activity: any = doc;

  console.log(`From hook: ${doc}`);
});
formalInstructionActivitySchema.post('find', async function (doc) {
  console.log(doc);
});
formalInstructionActivitySchema.post('findOneAndUpdate', async function (doc) {
  const activity: any = doc;
  FormalInstructionActivityController.calcWorkload(doc, doc.user, doc.group, doc.module);
  //await FormalInstructionActivityController.calcWorkload(activity.userId);
});
formalInstructionActivitySchema.post('findOneAndRemove', async function (doc) {
  const activity: any = doc;
  //await FormalInstructionActivityController.calcWorkload(activity.userId);
});

// VIRTUALS
formalInstructionActivitySchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true
});
formalInstructionActivitySchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

const FormalInstructionActivity = Activity.discriminator('FormalInstructionActivity', formalInstructionActivitySchema);
export default FormalInstructionActivity;

import mongoose from 'mongoose';

import WorkloadController from '../../workload/workload.controller';
import Activity from '../activity.model';
import SupervisionActivityController from './supervision-activity.controller';
import { ISupervisionActivity } from './supervision-activity.interface';

const supervisionActivitySchema = new mongoose.Schema(
  {
    supervisionRole: {
      type: String,
      trim: true
    },
    split: {
      type: Number
    },
    studentId: {
      type: String,
      ref: 'Student'
    },
    year: {
      type: String
    },
    workload: {
      total: { type: Number },
      percentageOfTeaching: { type: Number },
      percentageOfAnnual: { type: Number }
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
// supervisionActivitySchema.index({ studentId: 1, userId: 1, year: 1 }, { unique: true });

// HOOKS
supervisionActivitySchema.post('find', async function (activities) {
  await SupervisionActivityController.calcWorkload(activities);
});
// supervisionActivitySchema.post('findOneAndUpdate', async function (doc) {
//   const activity: any = doc;
//   await WorkloadController.calculateTotalWorkload(activity.userId);
// });
// supervisionActivitySchema.post('findOneAndRemove', async function (doc) {
//   const activity: any = doc;
//   await WorkloadController.calculateTotalWorkload(activity.userId);
// });

// VIRTUALS
supervisionActivitySchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

const SupervisionActivity = Activity.discriminator('SupervisionActivity', supervisionActivitySchema);
export default SupervisionActivity;

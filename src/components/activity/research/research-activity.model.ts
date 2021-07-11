import mongoose from 'mongoose';

import WorkloadController from '../../workload/workload.controller';
import Activity from '../activity.model';

const researchActivitySchema = new mongoose.Schema(
  {
    output: {
      type: String,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    conferenceActivities: [
      {
        type: String
      }
    ],
    authors: [
      {
        type: String
      }
    ],
    url: {
      type: String,
      trim: true
    },
    dates: [
      {
        type: Date
      }
    ],
    details: {
      type: String,
      trim: true
    },
    evidence: {
      type: String
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

// HOOKS
researchActivitySchema.post('save', async function () {
  const activity: any = this;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
researchActivitySchema.post('findOneAndUpdate', async function (doc) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
researchActivitySchema.post('findOneAndRemove', async function (doc) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});

// VIRTUALS

const ResearchActivity = Activity.discriminator('ResearchActivity', researchActivitySchema);
export default ResearchActivity;

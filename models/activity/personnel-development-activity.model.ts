import mongoose from 'mongoose';

import WorkloadController from '../../controllers/workload/workload.controller';
import Activity from './activity.model';

const personnelDevelopmentActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: [
    {
      type: Date
    }
  ],
  duration: {
    type: String
  },
  evidence: {
    type: String
  }
});

// VIRTUALS

// HOOKS
personnelDevelopmentActivitySchema.post('save', async function() {
  const activity: any = this;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
personnelDevelopmentActivitySchema.post('findOneAndUpdate', async function(
  doc
) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
personnelDevelopmentActivitySchema.post('findOneAndRemove', async function(
  doc
) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});

const PersonnelDevelopmentActivity = Activity.discriminator(
  'PersonnelDevelopmentActivity',
  personnelDevelopmentActivitySchema
);
export default PersonnelDevelopmentActivity;

import mongoose from 'mongoose';

import WorkloadController from '../../workload/workload.controller';
import Activity from '../activity.model';

const communityInstructionActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  evidence: {
    type: String
  }
});

// HOOKS
communityInstructionActivitySchema.post('save', async function() {
  const activity: any = this;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
communityInstructionActivitySchema.post('findOneAndUpdate', async function(
  doc
) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
communityInstructionActivitySchema.post('findOneAndRemove', async function(
  doc
) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});

// VIRTUALS

const CommInstructionActivity = Activity.discriminator(
  'CommInstructionActivity',
  communityInstructionActivitySchema
);
export default CommInstructionActivity;

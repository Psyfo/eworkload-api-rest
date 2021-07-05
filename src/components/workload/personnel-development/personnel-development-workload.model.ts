import mongoose from 'mongoose';

import { logger } from '../../../config/logger.config';

const personnelDevelopmentWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  personnelDevelopmentWorkloads: [
    {
      activity: {
        type: mongoose.Schema.Types.Mixed
      },
      totalHoursPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfWorkFocusPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfAnnualHoursPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfTotalHoursPerActivity: {
        type: Number,
        default: 0
      }
    }
  ],
  globalTarrif: {
    type: Number,
    default: 0
  },
  totalHoursPerUser: {
    type: Number,
    default: 0
  },
  percentageOfWorkFocusPerUser: {
    type: Number,
    default: 0
  },
  percentageOfAnnualHoursPerUser: {
    type: Number,
    default: 0
  },
  percentageOfTotalHoursPerUser: {
    type: Number,
    default: 0
  }
});

// HOOKS
personnelDevelopmentWorkloadSchema.post('save', async function(doc: any) {
  logger.info('Personnel Development Workload created');
});

// INDEX
personnelDevelopmentWorkloadSchema.index({ userId: 1 }, { unique: true });

// VIRTUALS
personnelDevelopmentWorkloadSchema.virtual('personnel-development-activity', {
  ref: 'PersonnelDevelopmentActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const PersonnelDevelopmentWorkload = mongoose.model(
  'PersonnelDevelopmentWorkload',
  personnelDevelopmentWorkloadSchema
);
export default PersonnelDevelopmentWorkload;

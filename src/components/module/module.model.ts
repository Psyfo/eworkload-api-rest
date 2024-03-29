import mongoose from 'mongoose';
import { IModule } from './module.interface';

const moduleSchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      trim: true
    },
    year: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      trim: true
    },
    assessmentMethod: {
      type: String,
      trim: true
    },
    nqfLevel: {
      type: String,
      trim: true
    },
    qualificationId: {
      type: String,
      trim: true,
      ref: 'Qualification'
    },
    offeringTypeId: {
      type: String,
      trim: true,
      ref: 'OfferingType'
    },
    disciplineId: {
      type: String,
      trim: true,
      ref: 'Discipline'
    },
    venueId: {
      type: String,
      ref: 'Venue'
    },
    blockId: {
      type: String,
      unique: false,
      ref: 'Block'
    },
    credits: {
      type: Number
    },
    stackId: {
      type: String
    },
    studyPeriod: {
      type: String
    },
    lecturedBy: {
      type: String,
      ref: 'Department'
    },
    enrolled: {
      type: Number
    },
    studentsEnrolled: {
      type: Number
    },
    studentsExpected: {
      type: Number
    },
    moderation: {
      type: String
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
moduleSchema.index({ moduleId: 1, year: 1, qualificationId: 1 }, { unique: true });

// HOOKS

// VIRTUALS
moduleSchema.virtual('discipline', {
  ref: 'Discipline',
  localField: 'disciplineId',
  foreignField: 'disciplineId',
  justOne: true
});
moduleSchema.virtual('offeringType', {
  ref: 'OfferingType',
  localField: 'offeringTypeId',
  foreignField: 'offeringTypeId',
  justOne: true
});
moduleSchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});
moduleSchema.virtual('venue', {
  ref: 'Venue',
  localField: 'venueId',
  foreignField: 'venueId',
  justOne: true
});
moduleSchema.virtual('block', {
  ref: 'Block',
  localField: 'blockId',
  foreignField: 'blockId',
  justOne: true
});
moduleSchema.virtual('lectured-by', {
  ref: 'Department',
  localField: 'lecturedBy',
  foreignField: 'departmentId',
  justOne: true
});
moduleSchema.virtual('moderator', {
  ref: 'User',
  localField: 'moderatorId',
  foreignField: 'userId',
  justOne: true
});

const Module = mongoose.model<IModule>('Module', moduleSchema);
export default Module;

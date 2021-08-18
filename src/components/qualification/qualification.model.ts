import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema(
  {
    qualificationId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    nqfLevel: {
      type: String,
      trim: true
    },
    credits: {
      type: Number
    },
    departmentId: {
      type: String,
      trim: true,
      ref: 'Department'
    },
    coordinatorId: {
      type: String,
      trim: true,
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

// Virtuals
qualificationSchema.virtual('department', {
  ref: 'Department',
  localField: 'departmentId',
  foreignField: 'departmentId',
  justOne: true
});
qualificationSchema.virtual('coordinator', {
  ref: 'User',
  localField: 'coordinatorId',
  foreignField: 'userId',
  justOne: true
});
const Qualification = mongoose.model('Qualification', qualificationSchema);
export default Qualification;

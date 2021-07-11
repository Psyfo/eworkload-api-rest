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
      type: String,
      trim: true
    },
    departmentId: {
      type: String,
      trim: true,
      ref: 'Department'
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

const Qualification = mongoose.model('Qualification', qualificationSchema);
export default Qualification;

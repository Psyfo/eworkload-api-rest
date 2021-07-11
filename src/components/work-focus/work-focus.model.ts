import mongoose from 'mongoose';

const workFocusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    teachingRatio: {
      type: Number
    },
    researchRatio: {
      type: Number
    },
    serviceRatio: {
      type: Number
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

const WorkFocus = mongoose.model('WorkFocus', workFocusSchema);
export default WorkFocus;

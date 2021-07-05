import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const disciplineSchema = new mongoose.Schema(
  {
    disciplineId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
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
    timestamps: true
  }
);

const Discipline = mongoose.model('Discipline', disciplineSchema);
export default Discipline;

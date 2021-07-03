import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const positionSchema = new mongoose.Schema(
  {
    positionId: {
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

const Position = mongoose.model('Position', positionSchema);
export default Position;

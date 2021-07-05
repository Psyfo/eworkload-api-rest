import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const offeringTypeSchema = new mongoose.Schema(
  {
    offeringTypeId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String
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

const OfferingType = mongoose.model('OfferingType', offeringTypeSchema);
export default OfferingType;

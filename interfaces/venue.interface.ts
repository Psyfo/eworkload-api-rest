import { Document } from 'mongoose';

export default interface IVenue extends Document {
  venueId: string;
  campus: string;
  capacity: number;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

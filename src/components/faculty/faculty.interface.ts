import { Document } from 'mongoose';

export default interface IFaculty extends Document {
  _id?: string;
  facultyId?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

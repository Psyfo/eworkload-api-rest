import IFaculty from '../faculty/faculty.interface';
import IUser from '../user/user.interface';
import { Document } from 'mongoose';

export default interface IDepartment extends Document {
  departmentId: string;
  name: string;
  facultyId: string;
  faculty?: IFaculty;
  hodId?: string;
  createdAt?: Date;
  updatedAt?: Date;

}

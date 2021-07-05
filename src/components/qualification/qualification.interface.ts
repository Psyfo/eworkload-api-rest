import IDepartment from '../department/department.interface';
import { Document } from 'mongoose';

export default interface IQualification extends Document {
  qualificationId: string;
  name: string;
  type: string;
  departmentId: string;
  department?: IDepartment;
  createdAt?: Date;
  updatedAt?: Date;
}

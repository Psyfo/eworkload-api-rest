import { IDepartment } from '../department/department.interface';

export interface IQualification {
  _id?: string;
  qualificationId?: string;
  name?: string;
  type?: string;
  departmentId?: string;
  department?: IDepartment;
  createdAt?: Date;
  updatedAt?: Date;
}

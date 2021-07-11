import IFaculty from '../faculty/faculty.interface';

export interface IDepartment {
  _id?: string;
  departmentId: string;
  name: string;
  facultyId: string;
  faculty?: IFaculty;
  hodId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { IModule } from '../module/module.interface';

export interface IGroup {
  _id?: string;
  groupId?: string;
  name?: string;
  moduleId?: string;
  module?: IModule;
  studentsEnrolled?: number;
  modularity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

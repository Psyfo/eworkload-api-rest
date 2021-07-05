import { Document } from 'mongoose';

import IModule from '../module/module.interface';
import IUser from '../user/user.interface';

export default interface IGroup extends Document {
  id: string;
  groupId: string;
  moduleId: string;
  module: IModule;
  studentsEnrolled: number;
  modularity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

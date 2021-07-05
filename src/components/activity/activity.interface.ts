import IDuty from '../duty/duty.interface';
import IUser from '../user/user.interface';
import { Document } from 'mongoose';

export default interface IActivity extends Document {
  activityId?: string;
  userId?: string;
  user?: IUser;
  dutyId: string;
  duty?: IDuty;
  approvalStatus?: string;
}

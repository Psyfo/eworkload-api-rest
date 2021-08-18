import { Document } from 'mongoose';
import { IDuty } from '../duty/duty.interface';
import { IUser } from '../user/user.interface';

export interface IActivity extends Document {
	_id: string;
	activityId?: string;
	userId: string;
	user: IUser;
	dutyId: string;
	duty: IDuty;
	approvalStatus?: string;
}

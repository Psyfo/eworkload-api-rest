import { Document } from 'mongoose';
import { IActivity } from '../activity.interface';

export interface IPersonnelDevelopmentActivity extends IActivity {
	title: string;
	date: Date;
	duration: string;
	evidence?: string;
}

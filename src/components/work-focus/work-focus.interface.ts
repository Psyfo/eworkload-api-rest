import { Document } from 'mongoose';

export interface IWorkFocus extends Document {
	_id: string;
	name: string;
	teachingRatio: number;
	researchRatio: number;
	serviceRatio: number;
	createdAt?: Date;
	updatedAt?: Date;
}

import { Document } from 'mongoose';

export interface IDuty extends Document {
	_id?: string;
	dutyId?: string;
	name?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

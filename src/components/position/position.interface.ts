import { Document } from 'mongoose';

export interface IPosition extends Document {
	_id?: string;
	positionId?: string;
	name?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

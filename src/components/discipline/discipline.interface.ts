import { Document } from 'mongoose';

export interface IDiscipline extends Document {
	_id?: string;
	disciplineId?: string;
	name?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

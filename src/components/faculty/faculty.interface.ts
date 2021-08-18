import { Document } from 'mongoose';

export interface IFaculty extends Document {
	_id?: string;
	facultyId?: string;
	name?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

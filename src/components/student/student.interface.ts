import { Document } from 'mongoose';

export interface IStudent extends Document {
	_id?: string;
	studentId?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	type?: string;
	title?: string;
	graduationDate?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

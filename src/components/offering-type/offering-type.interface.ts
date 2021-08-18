import { Document } from 'mongoose';

export interface IOfferingType extends Document {
	_id?: string;
	offeringTypeId?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

import { Document } from 'mongoose';

export interface IBlock extends Document {
	_id?: string;
	blockId?: string;
	name?: string;
	weeks: number;
	createdAt?: Date;
	updatedAt?: Date;
}

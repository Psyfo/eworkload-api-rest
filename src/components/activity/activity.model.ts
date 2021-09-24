import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IActivity } from './activity.interface';

const activitySchema = new mongoose.Schema(
	{
		activityId: {
			type: String,
			required: true,
			unique: true,
			default: uuidv4
		},
		userId: {
			type: String,
			ref: 'User'
		},
		dutyId: {
			type: String,
			ref: 'Duty'
		},
		approvalStatus: {
			type: String,
			default: 'awaiting'
		},
		createdAt: {
			type: Date
		},
		updatedAt: {
			type: Date
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'activityType',
		toJSON: {
			virtuals: true
		},
		toObject: {
			virtuals: true
		}
	}
);

// Hooks

// Virtuals
activitySchema.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: 'userId',
	justOne: true
});
activitySchema.virtual('duty', {
	ref: 'Duty',
	localField: 'dutyId',
	foreignField: 'dutyId',
	justOne: true
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;

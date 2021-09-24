import mongoose from 'mongoose';

import WorkloadController from '../../workload/workload.controller';
import Activity from '../activity.model';
import { IPublicServiceActivity } from './public-service-activity.interface';

const publicServiceActivitySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		evidence: {
			type: String
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true
		},
		toObject: {
			virtuals: true
		}
	}
);

// HOOKS
publicServiceActivitySchema.post('save', async function () {});
publicServiceActivitySchema.post('findOneAndUpdate', async function (doc) {});
publicServiceActivitySchema.post('findOneAndRemove', async function (doc) {});

// VIRTUALS

const PublicServiceActivity = Activity.discriminator<IPublicServiceActivity>(
	'PublicServiceActivity',
	publicServiceActivitySchema
);
export default PublicServiceActivity;

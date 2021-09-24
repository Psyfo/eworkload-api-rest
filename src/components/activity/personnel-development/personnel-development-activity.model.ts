import mongoose from 'mongoose';
import Activity from '../activity.model';
import { IPersonnelDevelopmentActivity } from './personnel-development-activity.interface';

const personnelDevelopmentActivitySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		date: [
			{
				type: Date
			}
		],
		duration: {
			type: String
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

// VIRTUALS

// HOOKS
personnelDevelopmentActivitySchema.post('save', async function () {});
personnelDevelopmentActivitySchema.post('findOneAndUpdate', async function (doc) {});
personnelDevelopmentActivitySchema.post('findOneAndRemove', async function (doc) {});

const PersonnelDevelopmentActivity = Activity.discriminator<IPersonnelDevelopmentActivity>(
	'PersonnelDevelopmentActivity',
	personnelDevelopmentActivitySchema
);
export default PersonnelDevelopmentActivity;

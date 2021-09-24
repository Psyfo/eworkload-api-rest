import mongoose from 'mongoose';

import Activity from '../activity.model';
import { IResearchActivity } from './research-activity.interface';

const researchActivitySchema = new mongoose.Schema(
	{
		output: {
			type: String,
			trim: true
		},
		title: {
			type: String,
			trim: true
		},
		conferenceActivities: [
			{
				type: String
			}
		],
		authors: [
			{
				type: String
			}
		],
		url: {
			type: String,
			trim: true
		},
		dates: [
			{
				type: Date
			}
		],
		details: {
			type: String,
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
researchActivitySchema.post('save', async function () {});
researchActivitySchema.post('findOneAndUpdate', async function (doc) {});
researchActivitySchema.post('findOneAndRemove', async function (doc) {});

// VIRTUALS

const ResearchActivity = Activity.discriminator<IResearchActivity>('ResearchActivity', researchActivitySchema);
export default ResearchActivity;

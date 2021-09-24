import { IAcademicAdministrationActivity } from 'components';
import mongoose from 'mongoose';
import Activity from '../activity.model';

const academicAdministrationActivitySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		qualificationId: {
			type: String
		},
		description: {
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
academicAdministrationActivitySchema.post('save', async function () {});
academicAdministrationActivitySchema.post('findOneAndUpdate', async function (doc) {});
academicAdministrationActivitySchema.post('findOneAndRemove', async function (doc) {});

// VIRTUALS
academicAdministrationActivitySchema.virtual('qualification', {
	ref: 'Qualification',
	localField: 'qualificationId',
	foreignField: 'qualificationId',
	justOne: true
});

const AcademicAdministrationActivity = Activity.discriminator<IAcademicAdministrationActivity>(
	'AcademicAdministrationActivity',
	academicAdministrationActivitySchema
);
export default AcademicAdministrationActivity;

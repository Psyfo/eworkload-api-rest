import mongoose from 'mongoose';
import IExecutiveManagementActivity from '../../../../.history/src/components/activity/executive-management/executive-management-activity.interface_20210923084322';
import Activity from '../activity.model';

const executiveManagementActivitySchema = new mongoose.Schema({
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
});

// HOOKS
executiveManagementActivitySchema.post('save', async function () {});
executiveManagementActivitySchema.post('findOneAndUpdate', async function (doc) {});
executiveManagementActivitySchema.post('findOneAndRemove', async function (doc) {});

// VIRTUALS

const ExecutiveManagementActivity = Activity.discriminator<IExecutiveManagementActivity>(
	'ExecutiveManagementActivity',
	executiveManagementActivitySchema
);
export default ExecutiveManagementActivity;

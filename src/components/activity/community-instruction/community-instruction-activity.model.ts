import { ICommunityInstructionActivity } from 'components';
import mongoose from 'mongoose';
import Activity from '../activity.model';

const communityInstructionActivitySchema = new mongoose.Schema(
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
communityInstructionActivitySchema.post('save', async function () {});
communityInstructionActivitySchema.post('findOneAndUpdate', async function (doc) {});
communityInstructionActivitySchema.post('findOneAndRemove', async function (doc) {});

// VIRTUALS

const CommunityInstructionActivity = Activity.discriminator<ICommunityInstructionActivity>(
	'CommunityInstructionActivity',
	communityInstructionActivitySchema
);
export default CommunityInstructionActivity;

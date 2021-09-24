/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose';
import Activity from '../activity.model';
import FormalInstructionActivityController from './formal-instruction-activity.controller';
import { IFormalInstructionActivity, IFormalInstructionWorkload } from './formal-instruction-activity.interface';

const formalInstructionActivitySchema = new mongoose.Schema(
	{
		groupId: {
			type: String,
			ref: 'Group'
		},
		workload: {
			baseContact: { type: Number, default: 0 },
			coordination: { type: Number, default: 0 },
			studentSupport: { type: Number, default: 0 },
			preparationTime: { type: Number, default: 0 },
			assessmentSetting: { type: Number, default: 0 },
			examMarking: { type: Number, default: 0 },
			courseworkMarking: { type: Number, default: 0 },
			feedback: { type: Number, default: 0 },
			formativeAssessment: { type: Number },
			other: { type: Number, default: 0 },
			total: { type: Number, default: 0 },
			percentageOfTeaching: { type: Number, default: 0 },
			percentageOfAnnual: { type: Number, default: 0 }
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
		toJSON: {
			virtuals: true
		},
		toObject: {
			virtuals: true
		}
	}
);

// INDEX

// HOOKS
formalInstructionActivitySchema.pre('save', function (this: IFormalInstructionActivity, next) {
	this.populate({
		path: 'group',
		model: 'Group',
		populate: [
			{
				path: 'modules',
				model: 'Module',
				populate: [{ path: 'block' }, { path: 'qualification' }, { path: 'offering-type' }, { path: 'department' }]
			}
		]
	})
		.populate('user')
		.execPopulate()
		.then(async () => {
			const workload: IFormalInstructionWorkload = await FormalInstructionActivityController.calcWorkload(this);
			this.workload = workload;
			next();
		});
});

// VIRTUALS
formalInstructionActivitySchema.virtual('group', {
	ref: 'Group',
	localField: 'groupId',
	foreignField: '_id',
	justOne: true
});

const FormalInstructionActivity = Activity.discriminator<IFormalInstructionActivity>(
	'FormalInstructionActivity',
	formalInstructionActivitySchema
);
export default FormalInstructionActivity;

import mongoose from 'mongoose';
import { IModule } from '../module/module.interface';
import { IGroup } from './group.interface';

const groupSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		moduleIds: [
			{
				type: String,
				ref: 'Module'
			}
		],
		studentsEnrolled: {
			type: Number
		},
		modularity: {
			type: Number,
			default: 1
		},
		coordinatorId: {
			type: String,
			ref: 'User'
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

// INDEXES
// groupSchema.index({ moduleId: 1, groupId: 1 }, { unique: true });

// HOOKS
groupSchema.pre('save', function (this: IGroup, next) {
	this.populate('modules')
		.execPopulate()
		.then(() => {
			let total: number = 0;
			this.modules?.map((module: IModule) => {
				total += module.studentsEnrolled;
				console.log(`Adding: ${module.studentsEnrolled}`);
			});
			this.studentsEnrolled = total;
			console.log(`Students Enrolled: ${this.studentsEnrolled}`);
			next();
		});
});
groupSchema.pre('updateOne', function (this: IGroup, next) {
	this.populate('modules')
		.execPopulate()
		.then(() => {
			let total: number = 0;
			this.modules?.map((module: IModule) => {
				total += module.studentsEnrolled;
				console.log(`Adding: ${module.studentsEnrolled}`);
			});
			this.studentsEnrolled = total;
			console.log(`Students Enrolled: ${this.studentsEnrolled}`);
			next();
		});
});

// VIRTUALS
groupSchema.virtual('modules', {
	ref: 'Module',
	localField: 'moduleIds',
	foreignField: '_id'
});
groupSchema.virtual('coordinator', {
	ref: 'User',
	localField: 'coordinatorId',
	foreignField: 'userId',
	justOne: true
});

const Group = mongoose.model<IGroup>('Group', groupSchema);
export default Group;

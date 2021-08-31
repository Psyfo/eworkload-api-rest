import { model, Schema } from 'mongoose';

const workloadSchema = new Schema(
	{
		userId: {
			type: String,
			ref: 'User'
		},
		year: {
			type: String,
			default: new Date().getFullYear()
		},
		workFocusName: {
			type: String,
			ref: 'WorkFocus'
		},
		academicAdministrationWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
		},
		communityInstructionWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
		},
		executiveManagementWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
		},
		formalInstructionWorkload: {
			type: Number,
			default: 0
		},
		personnelDevelopmentWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
		},
		publicServiceWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
		},
		researchWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
		},
		supervisionWorkload: {
			total: {
				type: Number,
				default: 0
			},
			percentageOfAnnual: {
				type: Number,
				default: 0
			}
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
workloadSchema.index({ userId: 1, year: 1 }, { unique: true });

// VIRTUALS
workloadSchema.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: 'userId',
	justOne: true
});
workloadSchema.virtual('work-focus', {
	ref: 'WorkFocus',
	localField: 'workFocusName',
	foreignField: 'workFocusName',
	justOne: true
});

const Workload = model('Workload', workloadSchema);
export default Workload;

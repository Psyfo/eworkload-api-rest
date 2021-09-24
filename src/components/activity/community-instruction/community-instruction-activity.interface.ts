import { IActivity } from '../activity.interface';

export interface ICommunityInstructionActivity extends IActivity {
	title?: string;
	description?: string;
	evidence?: string;
	workload?: ICommunityInstructionWorkload;
}

export interface ICommunityInstructionWorkload {
	total?: number;
	percentageOfTeaching?: number;
	percentageOfAnnual?: number;
}

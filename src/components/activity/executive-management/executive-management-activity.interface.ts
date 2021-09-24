import { IActivity } from '../activity.interface';

export interface IExecutiveManagementActivity extends IActivity {
	title: string;
	description: string;
	evidence?: string;
	workload?: IExecutiveManagementWorkload;
}

export interface IExecutiveManagementWorkload {
	total?: number;
	percentageOfTeaching?: number;
	percentageOfAnnual?: number;
}

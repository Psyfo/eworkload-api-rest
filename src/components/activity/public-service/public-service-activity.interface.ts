import { IActivity } from '../activity.interface';

export interface IPublicServiceActivity extends IActivity {
	title: string;
	description: string;
	evidence?: string;
	workload?: IPublicServiceWorkload;
}

export interface IPublicServiceWorkload {
	total?: number;
	percentageOfTeaching?: number;
	percentageOfAnnual?: number;
}

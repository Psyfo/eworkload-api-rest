import { IActivity } from '../activity.interface';

export interface IPersonnelDevelopmentActivity extends IActivity {
	title: string;
	date: Date;
	duration: string;
	evidence?: string;
	workload?: IPersonnelDevelopmentWorkload;
}

export interface IPersonnelDevelopmentWorkload {
	total?: number;
	percentageOfTeaching?: number;
	percentageOfAnnual?: number;
}

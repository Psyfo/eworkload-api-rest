import { Document } from 'mongoose';
export interface IWorkload extends Document {
	userId?: string;
	year?: string;
	academicAdministrationWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	communityInstructionWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	executiveManagementWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	formalInstructionWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	personnelDevelopmentWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	publicServiceWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	researchWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
	supervisionWorkload?: {
		total: number;
		percentageOfAnnual: number;
	};
}

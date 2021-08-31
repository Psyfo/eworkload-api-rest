import { Document } from 'mongoose';
export interface IWorkload extends Document {
	userId: string;
	year: string;
	workFocusName: string;
	academicAdministrationWorkload: ITotals;
	communityInstructionWorkload: ITotals;
	executiveManagementWorkload: ITotals;
	formalInstructionWorkload: ITotals;
	personnelDevelopmentWorkload: ITotals;
	publicServiceWorkload: ITotals;
	researchWorkload: ITotals;
	supervisionWorkload: ITotals;
}

export interface ITotals {
	total: number;
	percentageOfAnnual: number;
}

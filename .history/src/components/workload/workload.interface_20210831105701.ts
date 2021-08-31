import { Document } from 'mongoose';
export interface IWorkload extends Document {
	userId: string;
	year: string;
	workFocusName: string;
	academicAdministrationWorkload: {
		total: number;
	};
	// communityInstructionWorkload: ICommunityInstructionWorkload;
	// executiveManagementWorkload: IExecutiveManagementWorkload;
	// formalInstructionWorkload: IFormalInstructionWorkload;
	// personnelDevelopmentWorkload: IPersonnelDevelopmentWorkload;
	// publicServiceWorkload: IPublicServiceWorkload;
	// researchWorkload: IResearchWorkload;
	// supervisionWorkload: ISupervisionWorkload;
}

export interface INumbers {
	total: number;
	percentageOfAnnual: number;
}

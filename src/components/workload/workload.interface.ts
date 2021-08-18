import { Document } from 'mongoose';
export interface IWorkload extends Document {
	userId: string;
	year: string;
	workFocusName: string;
	// academicAdministrationWorkload: IAcademicAdministrationWorkload;
	// communityInstructionWorkload: ICommunityInstructionWorkload;
	// executiveManagementWorkload: IExecutiveManagementWorkload;
	// formalInstructionWorkload: IFormalInstructionWorkload;
	// personnelDevelopmentWorkload: IPersonnelDevelopmentWorkload;
	// publicServiceWorkload: IPublicServiceWorkload;
	// researchWorkload: IResearchWorkload;
	// supervisionWorkload: ISupervisionWorkload;
}

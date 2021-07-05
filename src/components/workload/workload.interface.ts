import { Document } from 'mongoose';

import IAcademicAdministrationWorkload from './academic-administration/academic-administration-workload.interface';
import ICommunityInstructionWorkload from './community-instruction/community-instruction-workload.interface';
import IExecutiveManagementWorkload from './executive-management/executive-management-workload.interface';
import IFormalInstructionWorkload from './formal-instruction/formal-instruction-workload.interface';
import IPersonnelDevelopmentWorkload from './personnel-development/personnel-development-workload.interface';
import IPublicServiceWorkload from './public-service/public-service-workload.interface';
import IResearchWorkload from './research/research-workload.interface';
import ISupervisionWorkload from './supervision/supervision-workload.interface';

export default interface IWorkload extends Document {
  userId: string;
  year: string;
  workFocusName: string;
  academicAdministrationWorkload: IAcademicAdministrationWorkload;
  communityInstructionWorkload: ICommunityInstructionWorkload;
  executiveManagementWorkload: IExecutiveManagementWorkload;
  formalInstructionWorkload: IFormalInstructionWorkload;
  personnelDevelopmentWorkload: IPersonnelDevelopmentWorkload;
  publicServiceWorkload: IPublicServiceWorkload;
  researchWorkload: IResearchWorkload;
  supervisionWorkload: ISupervisionWorkload;
}

import IFormalInstructionActivity from '../../activity/formal-instruction/formal-instruction-activity.interface';
import IModule from '../../module/module.interface';
import IBlock from '../../block/block.interface';
import IOfferingType from '../../offering-type/offering-type.interface';
import IQualification from '../../qualification/qualification.interface';
import { Document } from 'mongoose';

export interface IFormalInstructionWorkloadPerActivity {
  activity: IFormalInstructionActivity;
  module?: IModule;
  block?: IBlock;
  offeringType?: IOfferingType;
  qualification?: IQualification;
  studentsEnrolled: number;
  baseContactHours: number;
  coordinationHours: number;
  studentSupportHours: number;
  preparationTimeHours: number;
  assessmentSettingHours: number;
  examMarkingHours: number;
  courseworkMarkingHours: number;
  feedbackHours: number;
  formativeAssessmentHours: number;
  otherHoursPerActivity: number;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IFormalInstructionWorkload extends Document {
  userId: string;
  formalInstructionWorkloads: IFormalInstructionWorkloadPerActivity[];
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}

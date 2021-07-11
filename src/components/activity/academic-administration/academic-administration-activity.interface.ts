import { IQualification } from '../../qualification/qualification.interface';
import { IActivity } from '../activity.interface';

export interface IAcademicAdministrationActivity extends IActivity {
  title?: string;
  qualificationId?: string;
  qualification?: IQualification;
  description: string;
  evidence?: string;
}

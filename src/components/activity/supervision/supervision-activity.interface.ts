import { IStudent } from '../../student/student.interface';
import { ISupervisionWorkload } from '../../workload/supervision/supervision-workload.interface';
import { IActivity } from '../activity.interface';

export interface ISupervisionActivity extends IActivity {
  supervisionRole?: string;
  split?: number;
  studentId?: string;
  student?: IStudent;
  year?: string;
  workload?: ISupervisionWorkload;
}

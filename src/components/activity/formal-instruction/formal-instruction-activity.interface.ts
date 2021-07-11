import { IGroup } from '../../group/group.interface';
import { IActivity } from '../activity.interface';
import { IFormalInstructionWorkload } from './../../workload/formal-instruction/formal-instruction-workload.interface';

export interface IFormalInstructionActivity extends IActivity {
  groupId?: string;
  group?: IGroup;
  coordinatorId?: string;
  workload?: IFormalInstructionWorkload;
}

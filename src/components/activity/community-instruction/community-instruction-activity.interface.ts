import { IActivity } from '../activity.interface';

export interface ICommunityInstructionActivity extends IActivity {
  title?: string;
  description?: string;
  evidence?: string;
}

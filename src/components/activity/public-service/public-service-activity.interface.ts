import { IActivity } from '../activity.interface';

export interface IPublicServiceActivity extends IActivity {
  title: string;
  description: string;
  evidence?: string;
}

import { IActivity } from '../activity.interface';

export interface IResearchActivity extends IActivity {
  output?: string;
  title?: string;
  conferenceActivities?: string[];
  authors?: string[];
  url?: string;
  dates?: Date[];
  details?: string;
  evidence?: string;
}

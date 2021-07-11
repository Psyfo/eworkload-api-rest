import { IBlock } from '../block/block.interface';
import { IDiscipline } from '../discipline/discipline.interface';
import IOfferingType from '../offering-type/offering-type.interface';
import { IQualification } from '../qualification/qualification.interface';
import IVenue from '../venue/venue.interface';

export interface IModule {
  _id?: string;
  year?: string;
  moduleId?: string;
  blockId?: string;
  block?: IBlock;
  offeringTypeId?: string;
  offeringType?: IOfferingType;
  qualificationId?: string;
  qualification?: IQualification;
  name?: string;
  type?: string;
  assessmentMethod?: string;
  nqfLevel?: number;
  disciplineId?: string;
  discipline?: IDiscipline;
  venueId?: string;
  venue?: IVenue;
  credits?: number;
  stackId?: string;
  studyPeriod?: string;
  lecturedBy?: string;
  studentsEnrolled?: number;
  studentsExpected?: number;
  moderation?: string;
  coordinatorId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

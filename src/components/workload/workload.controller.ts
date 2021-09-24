import {
	IAcademicAdministrationActivity,
	ICommunityInstructionActivity,
	IExecutiveManagementActivity,
	IFormalInstructionActivity,
	IPersonnelDevelopmentActivity,
	IPublicServiceActivity,
	IResearchActivity,
	ISupervisionActivity
} from 'components';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { logger } from '../../config/logger.config';
import AcademicAdministrationActivity from '../activity/academic-administration/academic-administration-activity.model';
import CommunityInstructionActivity from '../activity/community-instruction/community-instruction-activity.model';
import ExecutiveManagementActivity from '../activity/executive-management/executive-management-activity.model';
import FormalInstructionActivity from '../activity/formal-instruction/formal-instruction-activity.model';
import PublicServiceActivity from '../activity/public-service/public-service-activity.model';
import Workload from './workload.model';

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
class WorkloadController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.find();
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.findOne({ userId: req.params.userId });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newWorkload = await new Workload(req.body).save();
			const result = await Workload.findOne({ _id: newWorkload._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body._id) },
				{
					$set: req.body
				},
				{ upsert: true }
			);
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object updated');
			return res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Workload.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object deleted');
			return res.status(200).json(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static totalHours = (): void => {};
	static calcAcademicAdministration = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: IAcademicAdministrationActivity[] = await AcademicAdministrationActivity.find({
				userId: userId
			});
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcCommunityInstruction = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: ICommunityInstructionActivity[] = await CommunityInstructionActivity.find({ userId: userId });
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcExecutiveAdministration = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: IExecutiveManagementActivity[] = await ExecutiveManagementActivity.find({ userId: userId });
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcFormalInstruction = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: IFormalInstructionActivity[] = (await FormalInstructionActivity.find({ userId: userId })) || [];
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcPersonnelDevelopment = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: IPersonnelDevelopmentActivity[] =
				(await PersonnelDevelopmentActivity.find({ userId: userId })) || [];
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcPublicService = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: IPublicServiceActivity[] = (await PublicServiceActivity.find({ userId: userId })) || [];
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcResearch = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: IResearchActivity[] = (await ResearchActivity.find({ userId: userId })) || [];
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static calcSupervision = async (userId: string): Promise<number> => {
		let hours: number = 0;
		try {
			const activities: ISupervisionActivity[] = (await SupervisionActivity.find({ userId: userId })) || [];
			for (let activity of activities) {
				if (activity) {
					hours += activity?.workload?.total || 0;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
				return 0;
			}
		}
		return hours;
	};
	static teachingHours = (): void => {};
	static serviceHours = (): void => {};
	static researchHours = (): void => {};
	static initializeWorkloads = (): void => {};
	static deleteWorkloads = (): void => {};
	static totalWorkload = (): void => {};
	static workloadSummaries = (): void => {};
	static calculateTotalWorkload = (): void => {};
}

export default WorkloadController;

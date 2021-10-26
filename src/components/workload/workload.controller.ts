import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IExecutiveManagementActivity } from 'src';
import { logger } from '../../config/logger.config';
import { IAcademicAdministrationActivity } from '../activity/academic-administration/academic-administration-activity.interface';
import AcademicAdministrationActivity from '../activity/academic-administration/academic-administration-activity.model';
import { ICommunityInstructionActivity } from '../activity/community-instruction/community-instruction-activity.interface';
import CommunityInstructionActivity from '../activity/community-instruction/community-instruction-activity.model';
import ExecutiveManagementActivity from '../activity/executive-management/executive-management-activity.model';
import { IFormalInstructionActivity } from '../activity/formal-instruction/formal-instruction-activity.interface';
import FormalInstructionActivity from '../activity/formal-instruction/formal-instruction-activity.model';
import { IPersonnelDevelopmentActivity } from '../activity/personnel-development/personnel-development-activity.interface';
import PersonnelDevelopmentActivity from '../activity/personnel-development/personnel-development-activity.model';
import { IPublicServiceActivity } from '../activity/public-service/public-service-activity.interface';
import PublicServiceActivity from '../activity/public-service/public-service-activity.model';
import { IResearchActivity } from '../activity/research/research-activity.interface';
import ResearchActivity from '../activity/research/research-activity.model';
import SupervisionActivity from '../activity/supervision/supervision-activity.model';
import User from '../user/user.model';
import WorkFocusController from '../work-focus/work-focus.controller';
import { ISupervisionActivity } from './../activity/supervision/supervision-activity.interface';
import Workload from './workload.model';

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
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
	static calcExecutiveManagement = async (userId: string): Promise<number> => {
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
		console.log('Fi Hours: ', hours);
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
	static calcTeachingHours = (): void => {};
	static calcServiceHours = (): void => {};
	static calcResearchHours = (): void => {};
	static initializeWorkload = async (userId: string): Promise<void> => {
		try {
			// check if exists
			const result = await Workload.findOne({ userId: userId });
			if (!result) {
				const newWorkload = new Workload({ userId: userId });
				await newWorkload.save();
				logger.info('Workload initiated');
			}
			logger.info('Workload exists');
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
		}
	};
	static initializeWorkloads = async (): Promise<void> => {
		try {
			const users = await User.find();
			for (let user of users) {
				await WorkloadController.initializeWorkload(user.userId);
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
		}
	};
	static deleteWorkloads = (): void => {};
	static calcTotalWorkload = async (userId: string): Promise<void> => {
		try {
			// check if workload exist or needs to initialize
			await WorkloadController.initializeWorkload(userId);

			const annual: number = WorkFocusController.annualHours();
			const aa: number = await WorkloadController.calcAcademicAdministration(userId);
			const ci: number = await WorkloadController.calcCommunityInstruction(userId);
			const em: number = await WorkloadController.calcExecutiveManagement(userId);
			const fi: number = await WorkloadController.calcFormalInstruction(userId);
			const pd: number = await WorkloadController.calcPersonnelDevelopment(userId);
			const ps: number = await WorkloadController.calcPublicService(userId);
			const r: number = await WorkloadController.calcResearch(userId);
			const s: number = await WorkloadController.calcSupervision(userId);

			const workload = {
				academicAdministrationWorkload: { total: aa, percentageOfAnnual: (aa / annual) * 100 },
				communityInstructionWorkload: { total: ci, percentageOfAnnual: (ci / annual) * 100 },
				executiveManagementWorkload: { total: em, percentageOfAnnual: (em / annual) * 100 },
				formalInstructionWorkload: { total: fi, percentageOfAnnual: (fi / annual) * 100 },
				personnelDevelopmentWorkload: { total: pd, percentageOfAnnual: (pd / annual) * 100 },
				publicServiceWorkload: { total: ps, percentageOfAnnual: (ps / annual) * 100 },
				researchWorkload: { total: r, percentageOfAnnual: (r / annual) * 100 },
				supervisionWorkload: { total: s, percentageOfAnnual: (s / annual) * 100 }
			};
			const result = await Workload.findOneAndUpdate(
				{ userId: userId },
				{
					$set: workload
				},
				{ upsert: true }
			);
			console.log('Result: ', result);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
		}
	};
	static calcTotalWorkloads = async (): Promise<void> => {
		try {
			const users = await User.find();
			for (let user of users) {
				await WorkloadController.calcTotalWorkload(user.userId);
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
		}
	};
	static workloadSummaries = (): void => {};
	static calculateTotalWorkload = (): void => {};
}

export default WorkloadController;

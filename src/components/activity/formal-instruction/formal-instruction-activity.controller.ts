/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../../config/logger.config';
import WorkFocusController from '../../work-focus/work-focus.controller';
import { IFormalInstructionActivity, IFormalInstructionWorkload } from './formal-instruction-activity.interface';
import FormalInstructionActivity from './formal-instruction-activity.model';

class FormalInstructionActivityController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await FormalInstructionActivity.find({})
				.populate({
					path: 'user',
					model: 'User',
					populate: [
						{ path: 'disciplines', model: 'Discipline' },
						{ path: 'position', model: 'Position' },
						{ path: 'workFocus', model: 'WorkFocus' },
						{ path: 'department', model: 'Department' }
					]
				})
				.populate('duty')
				.populate({
					path: 'group',
					model: 'Group',
					populate: [{ path: 'modules', model: 'Module', populate: [{ path: 'block' }] }]
				});
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
			const result = await FormalInstructionActivity.findOne({
				_id: mongoose.Types.ObjectId(req.params._id)
			})
				.populate('user')
				.populate('duty')
				.populate({
					path: 'group',
					populate: [
						{
							path: 'modules',
							populate: [
								{ path: 'block' },
								{ path: 'offering-type' },
								{ path: 'department' },
								{ path: 'qualification' }
							]
						}
					]
				});
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
			const result = await FormalInstructionActivity.findOne({
				userId: req.params.userId
			})
				.populate({
					path: 'user',
					model: 'User',
					populate: [
						{ path: 'disciplines', model: 'Discipline' },
						{ path: 'position', model: 'Position' },
						{ path: 'workFocus', model: 'WorkFocus' },
						{ path: 'department', model: 'Department' }
					]
				})
				.populate('duty')
				.populate({
					path: 'group',
					populate: {
						path: 'module',
						populate: [
							{ path: 'block' },
							{ path: 'offeringType' },
							{ path: 'qualification' },
							{ path: 'discipline' },
							{ path: 'venue' }
						]
					}
				});
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
			const newFormalInstructionActivity = new FormalInstructionActivity(req.body);
			await newFormalInstructionActivity.save();
			const result = await FormalInstructionActivity.findOne({
				_id: newFormalInstructionActivity._id
			})
				.populate({
					path: 'user',
					model: 'User',
					populate: [
						{ path: 'disciplines', model: 'Discipline' },
						{ path: 'position', model: 'Position' },
						{ path: 'workFocus', model: 'WorkFocus' },
						{ path: 'department', model: 'Department' }
					]
				})
				.populate('duty')
				.populate({
					path: 'group',
					populate: {
						path: 'module',
						populate: [
							{ path: 'formalInstructionActivity' },
							{ path: 'offeringType' },
							{ path: 'qualification' },
							{ path: 'discipline' },
							{ path: 'venue' }
						]
					}
				});
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
			const result = await FormalInstructionActivity.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body._id) },
				{
					$set: req.body
				},
				{ upsert: true }
			)
				.populate({
					path: 'user',
					model: 'User',
					populate: [
						{ path: 'disciplines', model: 'Discipline' },
						{ path: 'position', model: 'Position' },
						{ path: 'workFocus', model: 'WorkFocus' },
						{ path: 'department', model: 'Department' }
					]
				})
				.populate('duty')
				.populate({
					path: 'group',
					populate: {
						path: 'module',
						populate: [
							{ path: 'formalInstructionActivity' },
							{ path: 'offeringType' },
							{ path: 'qualification' },
							{ path: 'discipline' },
							{ path: 'venue' }
						]
					}
				});
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			// update workload
			//await this.calcWorkload(result._id);
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
			const result = await FormalInstructionActivity.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id))
				.populate({
					path: 'user',
					model: 'User',
					populate: [
						{ path: 'disciplines', model: 'Discipline' },
						{ path: 'position', model: 'Position' },
						{ path: 'workFocus', model: 'WorkFocus' },
						{ path: 'department', model: 'Department' }
					]
				})
				.populate('duty')
				.populate('group');
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
	static baseContact = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				const result: number = (activity?.group?.modules[0]?.credits / 4) * activity?.group?.modules[0]?.block?.weeks;
				return result;
			} else {
				return 0;
			}
		} catch (error: any) {
			logger.error(error.message);
			return 0;
		}
	};
	static coordination = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity) {
				let coordination: number = 0;
				if (activity.userId === activity?.group?.coordinatorId) {
					coordination = 5;
					coordination += (activity?.group?.studentsEnrolled - 100) / 40;
				}
				return coordination;
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static studentSupport = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return (
					(0.1 * activity?.group?.studentsEnrolled * activity.group.modules[0].credits) /
					activity?.group?.modules[0].block.weeks /
					activity?.group?.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static preparationTime = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return +(
					(FormalInstructionActivityController.baseContact(activity) * (activity.group.modules[0].nqfLevel - 4)) /
					activity.group.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static assessmentSetting = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return +(
					(((10 * activity.group.modules[0].credits) / activity.group.modules[0].block.weeks) *
						(activity.group.modules[0].nqfLevel - 4)) /
					activity.group.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static examMarking = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return +(
					(0.25 *
						activity.group.studentsEnrolled *
						(activity.group.modules[0].credits / activity.group.modules[0].block.weeks) *
						(activity.group.modules[0].nqfLevel - 4)) /
					2 /
					activity.group.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static courseworkMarking = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return +(
					(0.5 *
						activity.group.studentsEnrolled *
						(activity.group.modules[0].credits / activity.group.modules[0].block.weeks)) /
					activity.group.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static feedback = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return +(
					(1 *
						activity?.group?.studentsEnrolled *
						(activity.group.modules[0].credits / activity.group.modules[0].block.weeks)) /
					activity.group.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static formativeAssessment = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity.group) {
				return +(
					(0.4 *
						activity.group.studentsEnrolled *
						(activity.group.modules[0].credits / activity.group.modules[0].block.weeks)) /
					activity.group.modularity
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static moderation = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity) {
				return 0;
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static otherHours = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity != undefined) {
				return +(
					FormalInstructionActivityController.coordination(activity) +
					FormalInstructionActivityController.studentSupport(activity) +
					FormalInstructionActivityController.preparationTime(activity) +
					FormalInstructionActivityController.assessmentSetting(activity) +
					FormalInstructionActivityController.examMarking(activity) +
					FormalInstructionActivityController.courseworkMarking(activity) +
					FormalInstructionActivityController.feedback(activity) +
					FormalInstructionActivityController.formativeAssessment(activity)
				);
			} else {
				logger.error('otherHours: Activity is undefined');
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static totalHours = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity) {
				return +(
					FormalInstructionActivityController.baseContact(activity) +
					FormalInstructionActivityController.otherHours(activity)
				);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static percentageOfTeaching = async (activity: IFormalInstructionActivity): Promise<number> => {
		try {
			if (activity) {
				return +(
					(FormalInstructionActivityController.totalHours(activity) /
						(await WorkFocusController.teachingHours(activity.userId))) *
					100
				);
			} else {
				return 0;
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static percentageOfAnnual = (activity: IFormalInstructionActivity): number => {
		try {
			if (activity) {
				return +((FormalInstructionActivityController.totalHours(activity) / WorkFocusController.annualHours()) * 100);
			} else {
				return 0;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			return 0;
		}
	};
	static calcWorkload = async (activity: IFormalInstructionActivity): Promise<IFormalInstructionWorkload> => {
		try {
			const workload: IFormalInstructionWorkload = {
				baseContact: FormalInstructionActivityController.baseContact(activity),
				coordination: FormalInstructionActivityController.coordination(activity),
				studentSupport: FormalInstructionActivityController.studentSupport(activity),
				preparationTime: FormalInstructionActivityController.preparationTime(activity),
				assessmentSetting: FormalInstructionActivityController.assessmentSetting(activity),
				examMarking: FormalInstructionActivityController.examMarking(activity),
				courseworkMarking: FormalInstructionActivityController.courseworkMarking(activity),
				feedback: FormalInstructionActivityController.feedback(activity),
				formativeAssessment: FormalInstructionActivityController.formativeAssessment(activity),
				moderation: FormalInstructionActivityController.moderation(activity),
				other: FormalInstructionActivityController.otherHours(activity),
				total: FormalInstructionActivityController.totalHours(activity),
				percentageOfTeaching: await FormalInstructionActivityController.percentageOfTeaching(activity),
				percentageOfAnnual: FormalInstructionActivityController.percentageOfAnnual(activity)
			};

			return workload;
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(error.message);
			}
			throw new Error('Error compiling workload');
		}
	};
}

export default FormalInstructionActivityController;

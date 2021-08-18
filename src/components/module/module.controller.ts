/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IModule } from './module.interface';
import Module from './module.model';

class ModuleController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IModule[] = await Module.find()
				.populate('discipline')
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IModule | null = await Module.findOne({ _id: req.params._id })
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byDiscipline = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Module.find({ disciplineId: req.params.discipline })
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byQualification = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IModule[] = await Module.find({ qualificationId: req.params.qualificationId })
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newModule: IModule = new Module(req.body);
			await newModule.save();
			const result: IModule | null = await Module.findOne({ _id: newModule._id })
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IModule | null = await Module.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body._id) },
				{
					$set: req.body
				},
				{ upsert: true }
			)
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object updated');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IModule | null = await Module.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id))
				.populate({
					path: 'qualification',
					model: 'Qualification',
					populate: {
						path: 'department',
						model: 'Department',
						populate: {
							path: 'faculty',
							model: 'Faculty'
						}
					}
				})
				.populate('offeringType')
				.populate('block');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object deleted');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
}

export default ModuleController;

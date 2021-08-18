/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IGroup } from './group.interface';
import Group from './group.model';

class GroupController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IGroup[] = await Group.find().populate({
				path: 'modules',
				populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
			});
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error: any) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IGroup | null = await Group.findOne({ _id: req.params._id }).populate({
				path: 'module',
				populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
			});
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byModuleId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IGroup[] = await Group.find({ moduleId: req.params.moduleId }).populate({
				path: 'module',
				populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
			});
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
			const newGroup: IGroup = new Group(req.body);
			await newGroup.save();
			const result: IGroup | null = await Group.findOne({ _id: newGroup._id }).populate({
				path: 'module',
				populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
			});
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Group.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body._id) },
				{
					$set: req.body
				},
				{ upsert: true }
			).populate({
				path: 'module',
				populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
			});
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
			const result: IGroup | null = await Group.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id)).populate({
				path: 'module',
				populate: [{ path: 'block' }, { path: 'discipline' }, { path: 'qualification' }, { path: 'offering-type' }]
			});
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

export default GroupController;

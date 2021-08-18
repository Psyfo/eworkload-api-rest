/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IUser } from './user.interface';
import User from './user.model';

class UserController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IUser[] = await User.find({})
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus');
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
			const result: IUser = await User.findById({ _id: mongoose.Types.ObjectId(req.params._id) })
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IUser = (await User.findOne({ userId: req.params.userId })
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus')) as IUser;
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byPosition = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IUser[] = await User.find({ positionId: req.params.positionId })
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus');
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
			const newUser: IUser = new User(req.body);
			await newUser.save();
			const result: IUser = await User.findOne({ _id: newUser._id })
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus');
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IUser = await User.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body._id) },
				{
					$set: req.body
				},
				{ upsert: true }
			)
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus');
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
			const result: IUser = await User.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id))
				.populate('disciplines')
				.populate({
					path: 'department',
					model: 'Department',
					populate: {
						path: 'faculty',
						model: 'Faculty'
					}
				})
				.populate('position')
				.populate('workFocus');
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

export default UserController;

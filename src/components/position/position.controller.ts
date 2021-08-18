/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IPosition } from './position.interface';
import Position from './position.model';

class PositionController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Position.find();
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
			const result = await Position.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byPositionId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Position.findOne({ positionId: req.params.positionId });
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
			const newPosition: IPosition = await new Position(req.body).save();
			const result = await Position.findOne({ _id: newPosition._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Position.findByIdAndUpdate(
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
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IPosition = await Position.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default PositionController;

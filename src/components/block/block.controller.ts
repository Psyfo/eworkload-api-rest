/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IBlock } from './block.interface';
import Block from './block.model';

class BlockController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Block.find();
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
			const result = await Block.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byBlockId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Block.findOne({ blockId: req.params.blockId });
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
			const newBlock: IBlock = new Block(req.body);
			await newBlock.save();
			const result = await Block.findOne({ _id: newBlock._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Block.findByIdAndUpdate(
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
			const result: IBlock = await Block.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			logger.info('Object deleted');
			0;
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
}

export default BlockController;

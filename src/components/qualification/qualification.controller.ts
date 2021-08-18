/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IQualification } from './qualification.interface';
import Qualification from './qualification.model';

class QualificationController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IQualification[] = await Qualification.find({}).populate('department');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static byId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IQualification | null = await Qualification.findOne({
				_id: mongoose.Types.ObjectId(req.params._id)
			}).populate('department');
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const newQualification: IQualification = new Qualification(req.body);
			await newQualification.save();
			const result = await Qualification.findOne({ _id: newQualification._id }).populate('department');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IQualification = await Qualification.findOneAndUpdate(
				{ _id: req.body._id },
				{ $set: req.body },
				{ upsert: true }
			).populate('department');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IQualification = await Qualification.findOneAndRemove({ _id: req.body._id }).populate('department');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
}

export default QualificationController;

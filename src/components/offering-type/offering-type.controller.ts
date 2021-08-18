/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { logger } from '../../config/logger.config';
import { IOfferingType } from './offering-type.interface';
import OfferingType from './offering-type.model';

class OfferingTypeController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IOfferingType[] = await OfferingType.find({});
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
			const result: IOfferingType = await OfferingType.findOne({ _id: req.params._id });
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
			const newOfferingType: IOfferingType = await new OfferingType(req.body).save();
			const result: IOfferingType = await OfferingType.findOne({ _id: newOfferingType._id });
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IOfferingType = await OfferingType.findOneAndUpdate(
				{ _id: req.body._id },
				{ $set: req.body },
				{ upsert: true }
			);
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IOfferingType = await OfferingType.findOneAndRemove({ _id: req.body._id });
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
}

export default OfferingTypeController;

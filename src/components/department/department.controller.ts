/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { IDepartment } from './department.interface';
import Department from './department.model';

class DepartmentController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IDepartment[] = await Department.find({}).populate('faculty');
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
			const result: IDepartment = await Department.findOne({ _id: req.params._id });
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byDepartmentId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			const result: IDepartment = await Department.findOne({ departmentId: req.params.departmentId }).populate(
				'faculty'
			);
			if (!result) {
				return res.status(400).json({ message: 'No result found' });
			}

			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static byFacultyId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Department.find({ facultyId: req.params.facultyId });
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
			const newDepartment: IDepartment = new Department(req.body);
			await newDepartment.save();
			const result = await Department.findOne({ _id: newDepartment._id });
			logger.info('Object created');
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).json({ message: 'Server Error' });
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IDepartment = await Department.findByIdAndUpdate(
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
			const result: IDepartment = await Department.findByIdAndDelete(mongoose.Types.ObjectId(req.body._id));
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

export default DepartmentController;

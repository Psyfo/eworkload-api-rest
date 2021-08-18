/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */ import { Request, Response } from 'express';
import { logger } from '../../config/logger.config';
import { IStudent } from './student.interface';
import Student from './student.model';

class StudentController {
	static all = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result: IStudent[] = await Student.find({});
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
			const result: IStudent = await Student.findOne({ _id: req.params._id });
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
			const newStudent: IStudent = await new Student(req.body).save();
			const result = await Student.findOne({ _id: newStudent._id });
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Student.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true });
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
	static delete = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
		try {
			const result = await Student.findOneAndRemove({ _id: req.body._id });
			return res.status(200).json(result);
		} catch (error) {
			logger.error(error.message);
			return res.status(500).send('Server Error');
		}
	};
}

export default StudentController;

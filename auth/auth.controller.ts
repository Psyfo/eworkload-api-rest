import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from './../interfaces/user.interface';
import jwt from 'jsonwebtoken';

import { logger } from './../config/logger.config';
import User from './../models/user.model';
import { NextFunction, Request, Response } from 'express';

const AuthController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser = await User.findOne({ userId: req.body.userId });

      if (!user) {
        return res.status(400).json({ message: 'No result found' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = await jwt.sign({ userId: user.userId }, 'secret', {
          expiresIn: '1h'
        });
        const payload = {
          userId: user.userId,
          token: token,
          tokenExpiration: 1
        };
        logger.info(JSON.stringify(payload));
        return res.status(200).json(payload);
      } else {
        return res.status(400).json({ message: 'Password is not correct' });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server Error');
    }
  },
  async changePassword(req: Request, res: Response, next: NextFunction) {
    // Compare passwords. Change and return result or throw error.
    let user: IUser = await User.findById({ _id: mongoose.Types.ObjectId(req.body._id) });
    if (!user) {
      return res.status(400).json({ message: 'No result found' });
    }
    let isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
    if (isMatch !== true) {
      return res.status(400).json({ message: 'Password is not correct' });
    }
    // Check that new password is different
    if (req.body.newPassword === req.body.password) {
      return res.status(400).json({ message: 'Cannot use the same password' });
    }
    //Hash new password and update
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);
    await User.findOneAndUpdate(
      { userId: user.userId },
      {
        $set: {
          password: hash
        }
      },
      { upsert: true }
    );
    return res.status(400).json({ message: `Password changed for user: ${user.userId}` });
  }
};

export default AuthController;

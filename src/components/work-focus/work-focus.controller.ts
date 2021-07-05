import IUser from '../user/user.interface';
import IWorkFocus from './work-focus.interface';

import { logger } from '../../config/logger.config';
import parameters from '../../config/parameters.config';
import UserController from '../user/user.controller';
import User from '../user/user.model';
import WorkFocus from './work-focus.model';

export default class WorkFocusController {
  public static async workFocus(name: string) {
    return await WorkFocus.findOne({ name: name });
  }
  public static async workFocuses() {
    return await WorkFocus.find({});
  }
  public static async teachingHours(userId: string) {
    const user: IUser = (await User.findOne({ userId: userId }).populate(
      'work-focus'
    )) as IUser;
    const workFocus: IWorkFocus = (await this.workFocus(
      user.workFocusName
    )) as IWorkFocus;
    const teachingFocusPercentage: number = workFocus.teachingRatio;
    return (teachingFocusPercentage / 100) * parameters.annual_total_hours;
  }
  public static async researchHours(userId: string) {
    const user: IUser = (await User.findOne({ userId: userId }).populate(
      'work-focus'
    )) as IUser;
    const workFocus: IWorkFocus = (await this.workFocus(
      user.workFocusName
    )) as IWorkFocus;
    const researchFocusPercentage: number = workFocus.researchRatio;
    return (researchFocusPercentage / 100) * parameters.annual_total_hours;
  }
  public static async serviceHours(userId: string) {
    const user: IUser = (await UserController.user(userId)) as IUser;
    const workFocus: IWorkFocus = (await this.workFocus(
      user.workFocusName
    )) as IWorkFocus;
    const serviceFocusPercentage: number = workFocus.serviceRatio;

    return (serviceFocusPercentage / 100) * parameters.annual_total_hours;
  }
  public static async annualHours() {
    return parameters.annual_total_hours;
  }
  public static async createWorkFocus(workFocus: IWorkFocus) {
    return await workFocus.save();
  }
  public static async updateWorkFocus(workFocus: IWorkFocus) {
    return await WorkFocus.findOneAndUpdate(
      { name: workFocus.name },
      {
        $set: workFocus
      },
      { upsert: true }
    );
  }
  public static async deleteWorkFocus(workFocus: IWorkFocus) {
    return await WorkFocus.findOneAndRemove({_id: workFocus.id});
  }
}

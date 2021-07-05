import IActivity from './activity.interface';

import Activity from './activity.model';

export default class ActivityController {
  public static async byId(_id: string) {
    return await Activity.findOne({ _id: _id });
  }
  public static async all() {
    return await Activity.find({});
  }
  public static async byUser(userId: string) {
    return await Activity.find({ userId: userId });
  }
  public static async create(activity: IActivity) {
    const newActivity = new Activity(activity);
    return await newActivity.save();
  }
  public static async update(activity: IActivity) {
    return await Activity.findOneAndUpdate(
      { _id: activity._id },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async delete(activity: any) {
    return await Activity.findOneAndRemove(activity);
  }
}

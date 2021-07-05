import { NextFunction, Response, Request } from 'express';
import IEnrollment from './enrollment.interface';

import Enrollment from './enrollment.model';

class EnrollmentControl {
  public static async enrollment(id: string) {
    return await Enrollment.findOne({
      _id: id
    }).populate('qualification');
  }
  public static async enrollments() {
    return await Enrollment.find({}).populate('qualification');
  }
  public static async enrollmentsByYear(enrollmentYear: string) {
    return await Enrollment.find({ enrollmentYear: enrollmentYear });
  }
  public static async enrollmentsByQualification(qualificationId: string) {
    return await Enrollment.find({ qualificationId: qualificationId });
  }
  public static async createEnrollment(enrollment: IEnrollment) {
    return await new Enrollment(enrollment).save();
  }
  public static async updateEnrollment(enrollment: IEnrollment) {
    return await Enrollment.findOneAndUpdate(
      {
        _id: enrollment.id
      },
      {
        $set: enrollment
      },
      { upsert: true }
    );
  }
  public static async deleteEnrollment(enrollment: IEnrollment) {
    return await Enrollment.findOneAndRemove({ _id: enrollment.id });
  }
}

const EnrollmentController = {
  async all(req: Request, res: Response, next: NextFunction) {},
  async byId(req: Request, res: Response, next: NextFunction) {},
  async byYear(req: Request, res: Response, next: NextFunction) {},
  async byQualification(req: Request, res: Response, next: NextFunction) {},
  async create(req: Request, res: Response, next: NextFunction) {},
  async update(req: Request, res: Response, next: NextFunction) {},
  async delete(req: Request, res: Response, next: NextFunction) {},
  async exists(req: Request, res: Response, next: NextFunction) {}
};

export default EnrollmentController;

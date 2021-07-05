import FormalInstructionWorkload from './formal-instruction-workload.model';
import FormalInstructionController from '../../activity/formal-instruction/formal-instruction-activity.controller';
import BlockController from '../../block/block.controller';
import ModuleController from '../../module/module.controller';
import OfferingTypeController from '../../offering-type/offering-type.controller';
import QualificationController from '../../qualification/qualification.controller';
import IFormalInstructionActivity from '../../activity/formal-instruction/formal-instruction-activity.interface';
import IBlock from '../../block/block.interface';
import IModule from '../../module/module.interface';
import IOfferingType from '../../offering-type/offering-type.interface';
import IQualification from '../../qualification/qualification.interface';
import IFormalInstructionWorkload, {
  IFormalInstructionWorkloadPerActivity,
} from './formal-instruction-workload.interface';

export default class FormalInstructionWorkloadController {
  public static async initializeFIWorkload(userId: string) {
    const fiWorkload: IFormalInstructionWorkload = new FormalInstructionWorkload({
      userId: userId
    }) as IFormalInstructionWorkload;
    return await fiWorkload.save();
  }
  public static async formalInstructionWorkload(userId: string) {
    return await FormalInstructionWorkload.findOne({ userId: userId }).populate({
      path: 'formalInstructionActivity',
      populate: {
        path: 'module',
        populate: [{ path: 'block' }, { path: 'block' }, { path: 'offeringType' }, { path: 'qualification' }]
      }
    });
  }
  public static async calculateFormalInstructionWorkload(userId: string) {
    let formalInstructionWorkloads: IFormalInstructionWorkloadPerActivity[] = [];

    let activities: IFormalInstructionActivity[] = (await FormalInstructionController.formalInstructionActivitiesByUser(
      userId
    )) as IFormalInstructionActivity[];

    for (let activity of activities) {
      let studentsEnrolled: number = await FormalInstructionController.formalInstructionStudentsEnrolled(
        activity.activityId
      );
      let baseContactHours: number = await FormalInstructionController.formalInstructionBaseContactHours(
        activity.activityId
      );
      let coordinationHours: number = await FormalInstructionController.formalInstructionCoordinationHours(
        activity.activityId
      );
      let studentSupportHours: number = await FormalInstructionController.formalInstructionStudentSupportHours(
        activity.activityId
      );
      let preparationTimeHours: number = await FormalInstructionController.formalInstructionPreparationTimeHours(
        activity.activityId
      );
      let assessmentSettingHours: number = await FormalInstructionController.formalInstructionAssessmentSettingHours(
        activity.activityId
      );
      let examMarkingHours: number = await FormalInstructionController.formalInstructionExamMarkingHours(
        activity.activityId
      );
      let courseworkMarkingHours: number = await FormalInstructionController.formalInstructionCourseworkMarkingHours(
        activity.activityId
      );
      let feedbackHours: number = await FormalInstructionController.formalInstructionFeedbackHours(activity.activityId);
      let formativeAssessmentHours: number = await FormalInstructionController.formalInstructionFormativeAssessmentHours(
        activity.activityId
      );
      let otherHoursPerActivity: number = await FormalInstructionController.formalInstructionOtherHoursPerActivity(
        activity.activityId
      );
      let totalHoursPerActivity: number = await FormalInstructionController.formalInstructionTotalHoursPerActivity(
        activity.activityId
      );
      let percentageOfWorkFocusPerActivity: number = await FormalInstructionController.formalInstructionPercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      let percentageOfAnnualHoursPerActivity: number = await FormalInstructionController.formalInstructionPercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      let percentageOfTotalHoursPerActivity: number = await FormalInstructionController.formalInstructionPercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      let module: IModule = (await ModuleController.module(activity.group.module.id)) as IModule;
      let block: IBlock = (await BlockController.block(activity.group.module.blockId)) as IBlock;
      let offeringType: IOfferingType = (await OfferingTypeController.offeringType(
        activity.group.module.offeringTypeId
      )) as IOfferingType;
      let qualification: IQualification = (await QualificationController.qualification(
        activity.group.module.qualificationId
      )) as IQualification;

      formalInstructionWorkloads.push({
        activity: activity,
        module: module,
        block: block,
        offeringType: offeringType,
        qualification: qualification,
        studentsEnrolled: studentsEnrolled,
        baseContactHours: baseContactHours,
        coordinationHours: coordinationHours,
        studentSupportHours: studentSupportHours,
        preparationTimeHours: preparationTimeHours,
        assessmentSettingHours: assessmentSettingHours,
        examMarkingHours: examMarkingHours,
        courseworkMarkingHours: courseworkMarkingHours,
        feedbackHours: feedbackHours,
        formativeAssessmentHours: formativeAssessmentHours,
        otherHoursPerActivity: otherHoursPerActivity,
        totalHoursPerActivity: totalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    let totalHoursPerUser: number = 0;

    totalHoursPerUser = await FormalInstructionController.formalInstructionTotalHoursPerUser(userId);
    let percentageOfWorkFocusPerUser: number = 0;
    percentageOfWorkFocusPerUser = await FormalInstructionController.formalInstructionPercentageOfWorkFocusPerUser(
      userId
    );
    let percentageOfAnnualHoursPerUser: number = 0;
    percentageOfAnnualHoursPerUser = await FormalInstructionController.formalInstructionPercentageOfAnnualHoursPerUser(
      userId
    );
    let percentageOfTotalHoursPerUser: number = 0;
    percentageOfTotalHoursPerUser = await FormalInstructionController.formalInstructionPercentageOfTotalHoursPerUser(
      userId
    );

    const formalInstructionWorkload: IFormalInstructionWorkload = new FormalInstructionWorkload({
      userId: userId,
      formalInstructionWorkloads: formalInstructionWorkloads,
      totalHoursPerUser: totalHoursPerUser,
      percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
      percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
      percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
    }) as IFormalInstructionWorkload;

    return await formalInstructionWorkload.save();
  }
  public static async deleteFormalInstructionWorkload(userId: string) {
    return await FormalInstructionWorkload.findOneAndRemove({ userId: userId });
  }
}
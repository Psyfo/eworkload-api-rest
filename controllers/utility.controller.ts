import Module from './../models/module.model';
import ModuleController from './module.controller';
import { logger } from './../config/logger.config';

import IModule from './../interfaces/module.interface';

export default class UtilityController {
  public static async resetModuleDepartments(departmentId: string) {
    const modules = await Module.find({ departmentId: departmentId });
    const restModules = await modules.map((module: IModule) => {
      return Module.findOneAndUpdate(
        { _id: module.id },
        {
          $set: {
            lecturedBy: departmentId
          }
        }
      );
    });
    logger.info(restModules);
    return `Modules for department ${departmentId} reset`;
  }
}

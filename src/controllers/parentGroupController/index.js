import MongoUtil from 'util-mongodb';

import GroupStudentController from '../groupStudentController';
import ParentStudentController from '../parentStudentController';

export default class ParentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'parent';
    this.groupStudentController = new GroupStudentController();
    this.parentStudentController = new ParentStudentController();
  }

  list(parentId) {
    return this.parentStudentController.get(parentId)
      .then(results => this.groupStudentController.getGroupsFromStudent(results));
  }
}

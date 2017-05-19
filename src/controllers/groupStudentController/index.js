import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import StudentController from '../studentController';

export default class GroupStudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'groupStudent';
    this.studentController = new StudentController();
  }

  list(groupId) {
    const filter = {
      status: true,
      groupId,
    };
    return this.mongoUtil.find(this.collectionName, filter, {});
  }

  getStudents(groupId) {
    return this.list(groupId)
      .then(data => Promise.all(data.map(item => this.studentController.get(item.studentId))));
  }

  save(groupId, studentId) {
    if (!groupId || !studentId) {
      return null;
    }
    const newData = _.assign({}, {
      status: true,
      created: new Date(),
      groupId,
      studentId,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  upload(groupId, studentId) {
    const filter = {
      groupId,
      studentId,
    };
    return this.mongoUtil.findOne(this.collectionName, filter)
      .then(results => this.upsert(results, groupId, studentId));
  }

  upsert(entity, groupId, studentId) {
    return !entity ? this.save(groupId, studentId) : entity;
  }
}

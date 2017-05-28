import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import StudentController from '../studentController';

export default class ParentStudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'parentStudent';
    this.studentController = new StudentController();
  }

  list(parentId) {
    const filter = {
      status: true,
      parentId: this.mongoUtil.getObjectID(parentId),
    };
    return this.mongoUtil.find(this.collectionName, filter, {})
      .then(data => Promise.all(data.map(item => this.studentController.get(item.studentId))));
  }

  get(parentId) {
    const filter = {
      status: true,
      parentId: this.mongoUtil.getObjectID(parentId),
    };
    return this.mongoUtil.find(this.collectionName, filter, {});
  }

  save(parentId, studentId) {
    if (!parentId || !studentId) {
      return null;
    }
    const newData = _.assign({}, {
      status: true,
      created: new Date(),
      parentId,
      studentId,
    });
    return this.mongoUtil.insert(this.collectionName, newData);
  }

  upload(parentId, studentId) {
    const filter = {
      parentId,
      studentId,
    };
    return this.mongoUtil.findOne(this.collectionName, filter)
      .then(results => this.upsert(results, parentId, studentId));
  }

  upsert(entity, parentId, studentId) {
    return !entity ? this.save(parentId, studentId) : entity;
  }

  getParentsFromStudents(data) {
    if (!_.isArray(data) || !data.length) {
      return null;
    }
    const promises = data.map((item) => {
      const filter = {
        status: true,
        studentId: item.studentId,
      };
      return this.mongoUtil.findOne(this.collectionName, filter);
    });
    return Promise.all(promises);
  }

  delete(parentId) {
    const filter = {
      status: true,
      parentId: this.mongoUtil.getObjectID(parentId),
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }
}

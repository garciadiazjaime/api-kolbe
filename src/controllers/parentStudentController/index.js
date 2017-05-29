/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
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

  update(identityId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
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
    if (entity) {
      const newData = _.assign({}, entity);
      newData.status = true;
      return this.update(entity._id, newData);
    }
    return this.save(parentId, studentId);
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

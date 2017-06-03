/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
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

  update(identityId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
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
    if (entity) {
      const newData = _.assign({}, entity);
      newData.status = true;
      return this.update(entity._id, newData);
    }
    return this.save(groupId, studentId);
  }

  deleteStudents(students) {
    const promises = students.map((item) => {
      const filter = {
        studentId: item.studentId,
      };
      const newData = _.assign({}, {
        deleted: new Date(),
        status: false,
      });
      return Promise.all([
        this.mongoUtil.update(this.collectionName, newData, filter),
        this.studentController.delete(item.studentId.toString()),
      ]);
    });
    return Promise.all(promises);
  }

  getGroupsFromStudent(data) {
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
    return Promise.all(promises).then(groupStudent => groupStudent.filter((student, index, self) => self.findIndex(item => item.groupId.toString() === student.groupId.toString()) === index));
  }
}

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import StudentModel from '../../models/studentModel';

export default class StudentController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'student';
  }

  list(groupId) {
    const filter = {
      status: true,
      group: { $in: [groupId] },
    };
    return this.mongoUtil.find('student', filter, {});
  }

  get(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
      status: true,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

  save(parentId, groupId, schoolId) {
    const filter = {
      groupId,
      parentId,
      status: true,
    };
    return StudentModel.findOne(filter)
      .then((student) => {
        if (!student) {
          const newStudent = {
            groupId,
            parentId,
            schoolId,
          };
          const studentModel = new StudentModel(newStudent);
          return studentModel.save();
        }
        return Promise.resolve(student);
      });
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

  delete(identityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(identityId),
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

  upload(data) {
    return this.findByCode(data)
      .then(results => this.upsert(results, data))
      .then(this.extractId);
  }

  findByCode(data) {
    const filter = {
      code: data.code,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

  upsert(entity, data) {
    if (entity) {
      const newData = _.assign({}, data);
      newData.status = true;
      return this.update(entity._id, newData);
    }
    return this.save(data);
  }

  extractId(data) {
    return data.filter ? data.filter._id : data.data.insertedIds[0];
  }
}
